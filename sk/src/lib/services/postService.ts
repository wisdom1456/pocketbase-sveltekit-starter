// lib/services/postsService.ts
import { client } from '$lib/pocketbase';
import { writable } from 'svelte/store';

import { alertOnFailure } from '$lib/pocketbase/ui'; // Adjust the import path as necessary
import { alerts } from '$lib/components/Alerts.svelte';
import type {
  PostsResponse,
  SubpostResponse,
} from '$lib/pocketbase/generated-types';

import { createImage } from './imageService'; // Adjust the import path as necessary

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

async function populateTags(post: PostsResponse): Promise<string[]> {
  if (post.expand?.tags) {
    return post.expand.tags.map((tag: { title: string }) => tag.title);
  } else if (post.tags && post.tags.length > 0) {
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

async function populatePostData(post: PostsResponse): Promise<PostsResponse> {
  const featuredImage = await populateFeaturedImage(post);
  const tags = await populateTags(post);
  return { ...post, featuredImage, tags };
}

export async function fetchPosts(page: number = 1, perPage: number = 20): Promise<PostsResponse[]> {
  try {
    const result = await client.collection('posts').getList<PostsResponse>(page, perPage, {
      sort: '-updated',
      expand: 'featuredImage,tags'
    });
    return result.items;
  } catch (error) {
    console.error('Error fetching posts:', error);
    alerts.error('Failed to fetch posts. Please try again.');
    return [];
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    // Encode the slug to handle special characters
    const encodedSlug = encodeURIComponent(slug);

    const postsResponse = await client
      .collection('posts')
      .getFirstListItem<PostsResponse>(`slug = "${encodedSlug}"`, {
        expand: 'featuredImage,tags',
      });

    const post = await populatePostData(postsResponse);
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

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
    postsStore.update((store) => {
      return {
        ...store,
        posts: [...store.posts, populatedPost],
      };
    });
    return populatedPost;
  });
}

export async function fetchSubpostsByPostId(
  postId: string
): Promise<SubpostResponse[]> {
  try {
    const subpostsResponse = await client
      .collection('subpost')
      .getFullList<SubpostResponse>(200, {
        filter: `post = "${postId}"`,
        expand: 'post',
      });

    return subpostsResponse;
  } catch (error) {
    console.error('Error fetching subposts:', error);
    throw error;
  }
}

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
    return null; // Return null to indicate an error occurred
  }
}

export async function deletePost(postId: string): Promise<boolean> {
  try {
    await client.collection('posts').delete(postId);
    postsStore.update((store) => {
      return {
        ...store,
        posts: store.posts.filter((post) => post.id !== postId),
      };
    });
    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error('Error deleting post:', error);
    return false; // Return false to indicate an error occurred
  }
}

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

const postsStore = createPostsStore();
export { postsStore };
