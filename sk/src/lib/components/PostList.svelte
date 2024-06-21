<script lang="ts">
  import type { PostsResponse } from '$lib/pocketbase/generated-types';
  import PostCard from './PostCard.svelte';
  import { createEventDispatcher } from 'svelte';

  export let posts: PostsResponse[];
  export let tagMode: 'main' | 'few' | 'all' = 'few';

  const dispatch = createEventDispatcher();

  function handlePostDeleted(event: { detail: { id: any } }) {
    const deletedPostId = event.detail.id;
    posts = posts.filter((post) => post.id !== deletedPostId);
    dispatch('updatePosts', { posts });
  }
</script>

<div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {#each posts as post (post.id)}
    <PostCard {post} {tagMode} on:postDeleted={handlePostDeleted} />
  {/each}
</div>
