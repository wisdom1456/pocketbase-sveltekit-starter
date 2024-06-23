<script lang="ts">
  import type { PostsResponse, SubpostsResponse } from '$lib/pocketbase/generated-types';
  import { client } from '$lib/pocketbase';
  import { onMount, createEventDispatcher } from 'svelte';
  import { fetchSubpostsByPostId } from '$lib/services/postService';
  import { goto } from '$app/navigation';

  export let post: PostsResponse;
  export let featuredImage: string = '';
  export const tagMode: 'main' | 'few' | 'all' = 'few';

  let subposts: SubpostsResponse[] = [];
  let errorMessage: string = '';
  let showSubposts = false;

  const dispatch = createEventDispatcher();

  async function fetchSubPosts() {
    try {
      const postID = post?.id;
      if (postID) {
        subposts = await fetchSubpostsByPostId(postID);
        console.log('Subposts:', subposts); // Console output for testing
      }
    } catch (error) {
      errorMessage = 'Failed to load subposts';
      console.error('Error fetching subposts:', error); // Console output for errors
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
  <div class="bg-cover bg-center rounded-t-box w-full h-64 relative">
    {#if featuredImage}
      <img src={featuredImage} alt={post.title} class="absolute inset-0 h-full w-full object-cover rounded-t-box" />
    {:else if post.expand?.featuredImage}
      {@const imageRecord = post.expand.featuredImage}
      {@const imageUrl = imageRecord?.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
      <img src={imageUrl} alt={post.title} class="absolute inset-0 h-full w-full object-cover rounded-t-box" />
    {:else}
      <img src="https://via.placeholder.com/800x400.png?text=AI+Blog" alt="Placeholder" class="absolute inset-0 h-full w-full object-cover rounded-t-box" />
    {/if}
    <div class="absolute bottom-4 right-4 flex space-x-2 z-10">
      <a href={`/posts/${post.slug}/edit`} class="btn btn-outline btn-primary btn-xs hover:bg-primary hover:text-white transition-transform transform hover:scale-110" aria-label="Edit Post">
        Edit
      </a>
      <a href={`/posts/${post.slug}/inspire`} class="btn btn-outline btn-primary btn-xs hover:bg-primary hover:text-white transition-transform transform hover:scale-110" aria-label="Inspire">
        Inspire
      </a>
      <button on:click={deletePost} class="btn btn-outline btn-danger btn-xs hover:bg-danger hover:text-white transition-transform transform hover:scale-110" aria-label="Delete Post">
        Delete
      </button>
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-primary to-secondary opacity-20 rounded-t-box"></div>
  </div>

  <!-- Body -->
  <div class="flex flex-col gap-6 p-6 flex-1">
    {#if post.slug}
      <a href={`/posts/${post.slug}`} class="link link-hover text-xl font-bold">
        {post.title}
      </a>
    {/if}
    <p class="text-base-content text-sm leading-6">{post.blogSummary}</p>
  </div>

  <!-- Subposts -->
  {#if subposts.length > 0}
    <div class="px-6 pb-6">
      <button on:click={() => showSubposts = !showSubposts} class="btn btn-sm">
        {showSubposts ? 'Hide Subposts' : 'Show Subposts'}
      </button>
      {#if showSubposts}
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
  {/if}

  <!-- Footer -->
  <div class="flex justify-between items-center px-6 pb-6 mt-auto">
    {#if post.expand && post.expand.tags}
      <div class="relative group">
        <a href={`/tags/${post.expand.tags[0]?.title}`} class="btn btn-sm">
          {post.expand.tags[0]?.title}
        </a>
        <div class="absolute hidden group-hover:flex flex-col bg-base-100 border border-base-300 rounded-box p-2 mt-1 space-y-1 z-20">
          {#each post.expand.tags as tag, index}
            {#if index > 0}
              <a href={`/tags/${tag.title}`} class="btn btn-sm">
                {tag.title}
              </a>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
    {#if post?.updated}
      <time datetime={post.updated} class="text-sm text-right">
        {new Date(post.updated).toLocaleDateString()}
      </time>
    {/if}
  </div>
</article>

<style>
  .btn:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  }
  .group:hover .group-hover\:flex {
    display: flex;
  }
</style>
