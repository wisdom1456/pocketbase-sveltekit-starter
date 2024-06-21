<script lang="ts">
  import type { PostsResponse, SubpostsResponse } from '$lib/pocketbase/generated-types';
  import { client } from '$lib/pocketbase';
  import { onMount, createEventDispatcher } from 'svelte';
  import { fetchSubpostsByPostId } from '$lib/services/postService';
  import { goto } from '$app/navigation';

  export let post: PostsResponse;
  export let featuredImage: string = ''; // Add this line to accept the featured image URL as a prop
  export let tagMode: 'main' | 'few' | 'all' = 'few'; // Add this line

  let subposts: SubpostsResponse[] = [];
  let errorMessage: string = '';

  const dispatch = createEventDispatcher();

  async function fetchSubPosts() {
    try {
      const postID = post.id;
      subposts = await fetchSubpostsByPostId(postID);
    } catch (error) {
      errorMessage = 'Failed to load subposts';
    }
  }

  async function deletePost() {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      await client.collection('posts').delete(post.id);
      dispatch('postDeleted', { id: post.id });
      goto('/remember');
    } catch (error) {
      errorMessage = 'Failed to delete post';
    }
  }

  onMount(() => {
    if (post?.id) {
      fetchSubPosts();
    }
  });
</script>

<!-- Card -->
<article class="relative flex flex-col bg-base-300 rounded-box max-w-xl overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
  <!-- Image -->
  <div class="bg-cover bg-center rounded-t-box w-full h-72 relative">
    {#if featuredImage}
      <img src={featuredImage} alt={post.title} class="absolute inset-0 h-full w-full object-cover rounded-t-box" />
    {:else if post.expand?.featuredImage}
      {@const imageRecord = post.expand.featuredImage}
      {@const imageUrl = imageRecord?.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
      <img src={imageUrl} alt={post.title} class="absolute inset-0 h-full w-full object-cover rounded-t-box" />
    {:else}
      <img src="https://via.placeholder.com/800x400.png?text=AI+Blog" alt="Placeholder" class="absolute inset-0 h-full w-full object-cover rounded-t-box" />
    {/if}
    <div class="absolute bottom-4 right-4 flex space-x-2 z-50">
      <a href={`/posts/${post.slug}/edit`} class="btn btn-outline btn-primary hover:bg-primary hover:text-white transition-transform transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 2.488a2.68 2.68 0 011.867 1.867c.35 1.05.157 2.313-.418 3.211l-9.94 9.94a2.68 2.68 0 01-1.79.762l-4.15.467a.5.5 0 01-.563-.563l.467-4.15a2.68 2.68 0 01.762-1.79l9.94-9.94c.899-.575 2.162-.768 3.211-.418z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.75 7.75l-9.94 9.94" />
        </svg>
      </a>
      <a href={`/posts/${post.slug}/inspire`} class="btn btn-outline btn-primary hover:bg-primary hover:text-white transition-transform transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v9m0 0l-3-3m3 3l3-3m-6 9h6m-6 4h6" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 14H9v2c0 1.105.895 2 2 2h2c1.105 0 2-.895 2-2v-2z" />
        </svg>
      </a>
    </div>
    <div class="from-primary to-secondary absolute inset-0 bg-gradient-to-b opacity-20 rounded-t-box"></div>
  </div>

  <!-- Body -->
  <div class="flex flex-col gap-6 p-6">
    {#if post.slug}
      <a href={`/posts/${post.slug}`}>
        <span class="link link-hover text-xl font-bold">
          {post.title}
        </span>
      </a>
    {/if}
    <p class="text-base-content text-sm leading-6">{post.blogSummary}</p>
    <div class="flex gap-2 justify-between items-center">
      {#if post.expand && post.expand.tags[0]}
        <a href={`/tags/${post.expand.tags[0].title}`} class="btn btn-sm">
          {post.expand.tags[0].title}
        </a>
      {/if}
      {#if post?.updated}
        <time datetime={post.updated} class="text-sm">
          {new Date(post.updated).toLocaleDateString()}
        </time>
      {/if}
    </div>
    {#if subposts.length > 0}
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Subposts:</h3>
        <ul class="list-disc pl-5">
          {#each subposts as subpost}
            <li>
              <a href={`/subposts/${subpost.slug}`} class="link link-hover">{subpost.title}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</article>

<style>
  .btn:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  }
</style>
