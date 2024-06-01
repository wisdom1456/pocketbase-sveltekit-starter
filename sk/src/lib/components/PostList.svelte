<script lang="ts">
  import type { PostsResponse } from '$lib/pocketbase/generated-types';
  import PostCard from './PostCard.svelte';
  import { createEventDispatcher } from 'svelte';

  export let posts: PostsResponse[];

  // Ensure posts array is received correctly
  console.log('Received posts in PostList:', posts);

  const dispatch = createEventDispatcher();

  function handlePostDeleted(event: { detail: { id: any; }; }) {
    const deletedPostId = event.detail.id;
    posts = posts.filter(post => post.id !== deletedPostId);
    dispatch('updatePosts', { posts });
  }
</script>

{#if posts && posts.length > 0}
  {#each posts as post (post.id)}
    <PostCard {post} on:postDeleted={handlePostDeleted} />
  {/each}
{:else}
  <p>No posts available.</p>
{/if}
