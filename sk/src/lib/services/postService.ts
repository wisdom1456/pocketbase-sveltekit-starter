// lib/services/postsService.ts
import { client } from '$lib/pocketbase';
import { writable } from 'svelte/store';
import { alertOnFailure } from '$lib/pocketbase/ui'; // Adjust the import path as necessary
import { createImage } from './imageService'; // Adjust the import path as necessary
import type {
  PostsResponse,
  SubpostsResponse,
} from '$lib/pocketbase/generated-types';

// Utility function to populate featured image URL
async function populateFeaturedImage(
  post: PostsResponse
): Promise<string | undefined> {
  if (post.expand?.featuredImage) {
    const image = post.expand.featuredImage;
    if (
      'file' in image &&
      'id' in image &&
      'collectionId' in image &&
      'collectionName' in image
    ) {
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

// Utility function to populate tags
async function populateTags(post: PostsResponse): Promise<string[]> {
  if (post.expand?.tags) {
    return post.expand.tags.map((tag: { title: string }) => tag.title);
  } else if (Array.isArray(post.tags) && post.tags.length > 0) {
    const tagIds = post.tags.map((tagId) => `id = "${tagId}"`).join(' || ');
    try {
      const tags = await client
        .collection('tags')
        .getFullList(undefined, { filter: tagIds });
      return tags.map((tag) => tag.title);
    } catch (error) {
      console.error('Error fetching tags:', error);
      return []; // Return an empty array as a fallback
    }
  }
  return [];
}

// Utility function to populate post data
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

// Fetch posts and update the global posts store
// lib/services/postService.ts

// Function to fetch posts and update the global posts store
export async function fetchPosts(): Promise<PostsResponse[] | undefined> {
  try {
    const response = await client
      .collection('posts')
      .getList<PostsResponse>(1, 20, {
        sort: '-updated',
        expand: 'featuredImage,tags',
      });

    // Debug: Log the fetched posts
    console.log('Fetched posts:', response.items);

    postsStore.set({
      posts: response.items,
      page: response.page,
      perPage: response.perPage,
      totalPages: response.totalPages,
    });

    return response.items;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
}

// Fetch a post by its slug
export async function fetchPostBySlug(slug: string): Promise<PostsResponse> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const postResponse = await client
      .collection('posts')
      .getFirstListItem<PostsResponse>(`slug = "${encodedSlug}"`, {
        expand: 'featuredImage,tags',
      });

    return await populatePostData(postResponse);
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

// Create a new post
export async function createPost(
  postData: Partial<PostsResponse>,
  imagePrompt: string,
  engineId: string
): Promise<PostsResponse | null> {
  return await alertOnFailure(async () => {
    const imageRecordId = await createImage(imagePrompt, engineId);
    if (imageRecordId) {
      postData.featuredImage = imageRecordId;
    } else {
      throw new Error('Failed to generate image');
    }

    const createdPost = await client
      .collection('posts')
      .create<PostsResponse>(postData);
    const populatedPost = await populatePostData(createdPost);
    postsStore.update((store) => ({
      ...store,
      posts: [...store.posts, populatedPost],
    }));
    return populatedPost;
  });
}

// Fetch subposts by post ID
export async function fetchSubpostsByPostId(
  postId: string
): Promise<SubpostsResponse[]> {
  try {
    if (!postId) throw new Error('Post ID is required');

    // Example of disabling auto-cancellation or increasing timeout
    const subpostsResponse = await client
      .collection('subposts')
      .getFullList<SubpostsResponse>(200, {
        filter: `post = "${postId}"`,
        expand: 'post',
        // You can disable auto-cancellation here if possible or increase the timeout
        $autoCancel: false, // This depends on the Pocketbase client configuration
        // timeout: 60000,     // Example of increasing timeout
      });

    return subpostsResponse;
  } catch (error: any) {
    console.error('Error fetching subposts:', error);
    throw new Error(
      `Failed to fetch subposts for post ID ${postId}: ${error.message}`
    );
  }
}

// Update a post
export async function updatePost(
  postId: string,
  postData: Partial<PostsResponse>
): Promise<PostsResponse | null> {
  try {
    const updatedPost = await client
      .collection('posts')
      .update<PostsResponse>(postId, postData);
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

// Delete a post
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
