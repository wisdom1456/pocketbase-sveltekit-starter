<script lang="ts">
  import { fetchUserContent } from '$lib/services/postService';
  import type { PostsResponse, SubpostsResponse } from '$lib/pocketbase/generated-types';
  import { metadata } from '$lib/app/stores';
  import PostList from '$lib/components/PostList.svelte';
  import { onMount } from 'svelte';
  import LoginGuard from '$lib/components/LoginGuard.svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';

  let posts: PostsResponse[] = [];
  let subposts: SubpostsResponse[] = [];
  let isLoading = true;
  let errorMessage = '';

  async function loadPosts() {
    try {
      const { posts: fetchedPosts, subposts: fetchedSubposts } = await fetchUserContent();
      posts = fetchedPosts;
      subposts = fetchedSubposts;
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'An unknown error occurred';
      }
    } finally {
      isLoading = false;
    }
  }

  function handlePostDelete(event: CustomEvent) {
    const { postId } = event.detail;
    posts = posts.filter(post => post.id !== postId);
  }

  onMount(loadPosts);

  $metadata.title = 'Remember';
  $metadata.description = 'AI powered note taking';
</script>

<LoginGuard>
  {#if isLoading}
    <LoadingIndicator message="Loading your content..." />
  {:else if errorMessage}
    <div class="alert alert-error">{errorMessage}</div>
  {:else}
    <div class="container mx-auto px-4 py-24">
      <h2 class="mb-12 text-center text-4xl font-bold">Your Posts</h2>
      <PostList {posts} on:delete={handlePostDelete} />
      <!-- Add SubpostList if necessary -->
      <!-- <SubpostList {subposts} /> -->
    </div>
  {/if}
</LoginGuard>
