<script lang="ts">
  import { postsStore, fetchPosts } from '$lib/services/postService';
  import type { PostsResponse } from '$lib/pocketbase/generated-types';
  import { metadata } from '$lib/app/stores';
  import PostList from '$lib/components/PostList.svelte';
  import { onMount } from 'svelte';
  import LoginGuard from '$lib/components/LoginGuard.svelte';

  let posts: PostsResponse[] = [];

  // Subscribe to postsStore to get the posts data
  postsStore.subscribe((value) => {
    posts = value.posts;
    console.log('Posts in Remember Page:', posts); // Debug: Check if posts are received
  });

  // Set metadata for the page
  $metadata.title = "Remember";
  $metadata.description = "AI powered note taking";

  // Fetch posts when the component is mounted
  async function loadPosts() {
    try {
      await fetchPosts();
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }

  onMount(loadPosts);
</script>

<LoginGuard>
  <div class="container mx-auto p-6">
    {#if posts.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <PostList {posts} />
      </div>
    {:else}
      <p class="text-center">No posts available.</p>
    {/if}
  </div>
</LoginGuard>
