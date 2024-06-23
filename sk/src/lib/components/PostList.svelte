<script lang="ts">
  import { client } from '$lib/pocketbase';
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

  function getFeaturedImageUrl(post: PostsResponse): string {
    if (post.expand?.featuredImage) {
      const imageRecord = post.expand.featuredImage;
      const url = imageRecord?.file ? client.getFileUrl(imageRecord, imageRecord.file) : '';
      console.log('Image URL:', url); // Add logging here
      return url;
    }
    return '';
  }
</script>

<div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {#each posts as post (post.id)}
    <PostCard {post} {tagMode} featuredImage={getFeaturedImageUrl(post)} on:postDeleted={handlePostDeleted} />
  {/each}
</div>
