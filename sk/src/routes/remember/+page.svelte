<!-- Parent Component -->
<script lang="ts">
  import { postsStore, fetchPosts } from '$lib/services/postService';
  import type { PostsResponse } from '$lib/pocketbase/generated-types';
  import { metadata } from '$lib/app/stores';
  import PostList from '$lib/components/PostList.svelte';
  import { onMount } from 'svelte';
  import LoginGuard from '$lib/components/LoginGuard.svelte';

  let posts: PostsResponse[] = [];

  postsStore.subscribe((value) => {
    posts = value.posts;
    console.log('Posts in Remember Page:', posts);
  });

  $metadata.title = 'Remember';
  $metadata.description = 'AI powered note taking';

  async function loadPosts() {
    try {
      await fetchPosts();
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }

  onMount(loadPosts);
</script>

<LoginGuard>
  <div class="container mx-auto p-6">
    {#if posts.length > 0}
      <PostList {posts} tagMode="few" />
    {:else}
      <p class="text-center">No posts available.</p>
    {/if}
  </div>
</LoginGuard>
