import { client } from '$lib/pocketbase';
import { writable } from 'svelte/store';
import { alertOnFailure } from '$lib/pocketbase/ui'; // Adjust the import path as necessary
import { createImage } from './imageService'; // Adjust the import path as necessary
import type { PostsResponse, SubpostsResponse } from '$lib/pocketbase/generated-types';

/**
 * Get the logged-in user's ID
 * @returns {string | null} - The user ID or null if not logged in
 */
function getLoggedInUserId(): string | null {
  const authModel = client.authStore.model;
  return authModel ? authModel.id : null;
}

/**
 * Fetch posts created by the logged-in user
 * @param {string} userId - The ID of the logged-in user
 * @returns {Promise<PostsResponse[]>} - A promise that resolves to an array of posts
 */
async function fetchPostsByUserId(userId: string): Promise<PostsResponse[]> {
  const result = await client.collection('posts').getFullList({
    filter: `userid = '${userId}' && userid != ''`,
    expand: 'featuredImage,tags',
  });
  return result as unknown as PostsResponse[];
}

/**
 * Fetch subposts created by the logged-in user
 * @param {string} userId - The ID of the logged-in user
 * @returns {Promise<SubpostsResponse[]>} - A promise that resolves to an array of subposts
 */
async function fetchSubpostsByUserId(userId: string): Promise<SubpostsResponse[]> {
  const result = await client.collection('subposts').getFullList({
    filter: `userid = '${userId}' && userid != ''`,
    expand: 'post',
  });
  return result as unknown as SubpostsResponse[];
}

/**
 * Fetch posts and subposts created by the logged-in user
 * @returns {Promise<{ posts: PostsResponse[], subposts: SubpostsResponse[] }>} - A promise that resolves to an object containing arrays of posts and subposts
 */
export async function fetchUserContent() {
  const userId = getLoggedInUserId();
  if (!userId) {
    throw new Error('User is not logged in');
  }

  const [posts, subposts] = await Promise.all([
    fetchPostsByUserId(userId),
    fetchSubpostsByUserId(userId),
  ]);

  return { posts, subposts };
}

/**
 * Utility function to populate featured image URL
 * @param {PostsResponse} post - The post response object
 * @returns {Promise<string | undefined>} - The URL of the featured image or undefined
 */
async function populateFeaturedImage(
  post: PostsResponse
): Promise<string | undefined> {
  if (post.expand?.featuredImage) {
    const image = post.expand.featuredImage;
    if ('file' in image && 'id' in image && 'collectionId' in image && 'collectionName' in image) {
      try {
        return client.getFileUrl(image, image.file);
      } catch (error) {
        console.error('Error getting featured image URL:', error);
        return 'https://via.placeholder.com/800x400.png?text=cool+wind'; // Set a default image URL
      }
    }
  }
  return undefined;
}

/**
 * Utility function to populate tags
 * @param {PostsResponse} post - The post response object
 * @returns {Promise<string[]>} - An array of tag titles
 */
async function populateTags(post: PostsResponse): Promise<string[]> {
  if (post.expand?.tags) {
    return post.expand.tags.map((tag: { title: string }) => tag.title);
  } else if (Array.isArray(post.tags) && post.tags.length > 0) {
    const tagIds = post.tags.map((tagId) => `id = "${tagId}"`).join(' || ');
    try {
      const tags = await client.collection('tags').getFullList(undefined, { filter: tagIds });
      return tags.map((tag) => tag.title);
    } catch (error) {
      console.error('Error fetching tags:', error);
      return []; // Return an empty array as a fallback
    }
  }
  return [];
}

/**
 * Utility function to populate post data
 * @param {PostsResponse} post - The post response object
 * @returns {Promise<PostsResponse>} - The populated post response object
 */
async function populatePostData(post: PostsResponse): Promise<PostsResponse> {
  const featuredImage = await populateFeaturedImage(post);
  const tags = await populateTags(post);
  return { ...post, featuredImage, tags };
}

// Create a writable store for posts
function createPostsStore() {
  const { subscribe, set, update } = writable<{
    posts: PostsResponse[];
    page: number;
    perPage: number;
    totalPages: number;
  }>({
    posts: [],
    page: 1,
    perPage: 20,
    totalPages: 1,
  });

  return {
    subscribe,
    set,
    update,
    appendPosts: (newPosts: PostsResponse[], totalPages: number) =>
      update((store) => ({
        ...store,
        posts: [...store.posts, ...newPosts],
        totalPages,
      })),
    reset: () => set({ posts: [], page: 1, perPage: 20, totalPages: 1 }),
  };
}

// Global posts store
export const postsStore = createPostsStore();

/**
 * Create a new post
 * @param {Partial<PostsResponse>} postData - The data for the new post
 * @param {string} imagePrompt - The prompt for generating the featured image
 * @param {string} engineId - The ID of the image generation engine
 * @returns {Promise<PostsResponse | null>} - A promise that resolves to the created post or null
 */
export async function createPost(
  postData: Partial<PostsResponse>,
  imagePrompt: string,
  engineId: string
): Promise<PostsResponse | null> {
  return await alertOnFailure(async () => {
    const userId = getLoggedInUserId();
    if (!userId) {
      throw new Error('User is not logged in');
    }

    postData.userid = userId; // Ensure the post has the user ID

    const imageRecordId = await createImage(imagePrompt, engineId);
    if (imageRecordId) {
      postData.featuredImage = imageRecordId;
    } else {
      throw new Error('Failed to generate image');
    }

    const createdPost = await client.collection('posts').create<PostsResponse>(postData);
    const populatedPost = await populatePostData(createdPost);
    postsStore.update((store) => ({
      ...store,
      posts: [...store.posts, populatedPost],
    }));
    return populatedPost;
  });
}

/**
 * Fetch posts and update the global posts store
 * @returns {Promise<PostsResponse[] | undefined>} - A promise that resolves to an array of posts or undefined
 */
export async function fetchPosts(): Promise<PostsResponse[] | undefined> {
  try {
    const userId = getLoggedInUserId();
    if (!userId) {
      throw new Error('User is not logged in');
    }

    const response = await client
      .collection('posts')
      .getList<PostsResponse>(1, 20, {
        filter: `userid = '${userId}' && userid != ''`,
        sort: '-updated',
        expand: 'featuredImage,tags',
      });

    const populatedPosts = await Promise.all(response.items.map(populatePostData));

    postsStore.set({
      posts: populatedPosts,
      page: response.page,
      perPage: response.perPage,
      totalPages: response.totalPages,
    });

    return populatedPosts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
}

/**
 * Fetch a post by its slug
 * @param {string} slug - The slug of the post
 * @returns {Promise<PostsResponse>} - A promise that resolves to the post response object
 */
export async function fetchPostBySlug(slug: string): Promise<PostsResponse> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const postResponse = await client.collection('posts').getFirstListItem<PostsResponse>(`slug = "${encodedSlug}"`, {
      expand: 'featuredImage,tags',
    });

    return await populatePostData(postResponse);
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export async function createSubpost(subpostData: Partial<SubpostsResponse>): Promise<SubpostsResponse | null> {
  const userId = getLoggedInUserId();
  if (!userId) {
    throw new Error('User is not logged in');
  }

  subpostData.userid = userId; // Ensure the subpost has the user ID

  try {
    const createdSubpost = await client.collection('subposts').create<SubpostsResponse>(subpostData);
    console.log('Created Subpost:', createdSubpost); // Log the created subpost for debugging
    return createdSubpost;
  } catch (error) {
    console.error('Error creating subpost:', error);
    return null;
  }
}


/**
 * Fetch subposts by post ID
 * @param {string} postId - The ID of the post
 * @returns {Promise<SubpostsResponse[]>} - A promise that resolves to an array of subposts
 */
export async function fetchSubpostsByPostId(postId: string): Promise<SubpostsResponse[]> {
  try {
    if (!postId) throw new Error('Post ID is required');

    const userId = getLoggedInUserId();
    if (!userId) {
      throw new Error('User is not logged in');
    }

    const subpostsResponse = await client.collection('subposts').getFullList<SubpostsResponse>(200, {
      filter: `post = '${postId}' && userid = '${userId}' && userid != ''`,
      expand: 'post',
    });

    return subpostsResponse;
  } catch (error: any) {
    console.error('Error fetching subposts:', error);
    throw new Error(`Failed to fetch subposts for post ID ${postId}: ${error.message}`);
  }
}

/**
 * Update a post
 * @param {string} postId - The ID of the post
 * @param {Partial<PostsResponse>} postData - The data to update the post with
 * @returns {Promise<PostsResponse | null>} - A promise that resolves to the updated post or null
 */
export async function updatePost(postId: string, postData: Partial<PostsResponse>): Promise<PostsResponse | null> {
  try {
    const updatedPost = await client.collection('posts').update<PostsResponse>(postId, postData);
    const populatedPost = await populatePostData(updatedPost);
    postsStore.update((store) => {
      const index = store.posts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        const updatedPosts = [...store.posts];
        updatedPosts[index] = populatedPost;
        return { ...store, posts: updatedPosts };
      }
      return store;
    });
    return populatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

/**
 * Delete a post
 * @param {string} postId - The ID of the post
 * @returns {Promise<boolean>} - A promise that resolves to true if the post was deleted, false otherwise
 */
export async function deletePost(postId: string): Promise<boolean> {
  try {
    await client.collection('posts').delete(postId);
    postsStore.update((store) => ({
      ...store,
      posts: store.posts.filter((post) => post.id !== postId),
    }));
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}
