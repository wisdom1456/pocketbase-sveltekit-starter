import { writable } from 'svelte/store';
import type { PostsResponse } from '$lib/pocketbase/generated-types';

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

export const postsStore = createPostsStore();
