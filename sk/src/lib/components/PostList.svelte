<script lang="ts">
  import type { PostsResponse } from '$lib/pocketbase/generated-types';
  import PostCard from './PostCard.svelte';

  export let posts: PostsResponse[];

  // Ensure posts array is received correctly
  console.log('Received posts in PostList:', posts);
</script>

{#if posts && posts.length > 0}
  {#each posts as post (post.id)}
    <PostCard {post} />
  {/each}
{:else}
  <p>No posts available.</p>
{/if}
