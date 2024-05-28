<script lang="ts">
  import { postsStore, fetchPosts } from "$lib/services/postService";
  import type { PostsResponse } from "$lib/pocketbase/generated-types";
  import { metadata } from "$lib/app/stores";
  import PostList from "$lib/components/PostList.svelte";
  import { onDestroy, onMount } from "svelte";
  import LoginGuard from "$lib/components/LoginGuard.svelte";
  
  let posts: PostsResponse[] = [];
  
  // Subscribe to posts store
  const unsubscribe = postsStore.subscribe((value) => {
    posts = value.posts;
  });
  
  $metadata.title = "Remember";
  $metadata.description = "AI powered note taking";
  
  // Fetch posts when the component is mounted
  onMount(async () => {
    try {
      await fetchPosts();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  });
  
  // Cleanup subscription
  onDestroy(() => {
    unsubscribe();
  });
  </script>
  
  <LoginGuard>
    <div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        {#if Array.isArray(posts) && posts.length > 0}
          <div class="grid grid-cols-1 gap-x-2 gap-y-2 overflow-y-auto lg:grid-cols-3">
            <PostList {posts} />
          </div>
        {:else}
          <p>No posts available.</p>
        {/if}
      </div>
    </div>
  </LoginGuard>
  