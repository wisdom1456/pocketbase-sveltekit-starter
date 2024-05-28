<script lang="ts">
  import type { PostsResponse } from '$lib/pocketbase/generated-types';
  import Markdown from 'svelte-markdown';
  import TagGroup from '$lib/components/TagGroup.svelte';
  import { client } from '$lib/pocketbase';
  import SubPostCard from '$lib/components/SubPostCard.svelte';
  import { onMount } from 'svelte';

  export let post: PostsResponse;

  let subPosts: any[] = [];
  let errorMessage: string = '';

  async function fetchSubPosts() {
    try {
      await client.admins.authWithPassword('admin@example.com', 'admin_password'); // Replace with actual credentials

      const subpostsResponse = await client.collection('subpost').getList(1, 50, {
        filter: `post="${post.id}"`,
        expand: 'post',
        autoCancel: false
      });

      subPosts = subpostsResponse.items;
    } catch (error: unknown) {
      console.error('Error fetching subposts:', error);
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        errorMessage = 'An unknown error occurred';
      }
    }
  }

  onMount(() => {
    if (post && post.id) {
      fetchSubPosts();
    }
  });
</script>

<div class="card border border-secondary bg-base-100 m-4 flex flex-col justify-between shadow-xl">
  <figure class="w-full">
    {#if post.expand?.featuredImage}
      {@const imageRecord = post.expand.featuredImage}
      {@const imageUrl = imageRecord && imageRecord.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
      <img src={imageUrl} alt={post.title} class="aspect-[16/9] w-full rounded-t-lg object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
    {:else}
      <img src="https://via.placeholder.com/800x400.png?text=AI+Blog" alt="Placeholder" class="aspect-[16/9] w-full rounded-t-lg object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
    {/if}
  </figure>
  <div class="p-4">
    <div class="prose items-center">
      {#if post && post.updated}
        <time datetime={post.updated} class="text-accent">{new Date(post.updated).toLocaleDateString()}</time>
      {/if}
    </div>
    <div class="group relative px-2">
      {#if post && post.title}
        <a href={`/posts/${post.slug}`} class="prose-lg text-primary hover:text-secondary font-bold">{post.title}</a>
      {/if}
      {#if post && post.blogSummary}
        <div class="prose-sm text-base-content mt-3 line-clamp-6 text-justify">
          <Markdown source={post.blogSummary} />
        </div>
      {/if}
    </div>
  </div>
  <div class="p-4">
    <TagGroup {post} />
    <div class="card-actions mt-4 justify-between">
      <a class="btn btn-outline" href={`/posts/${post.slug}/edit`}>Edit</a>
      <a class="btn btn-outline" href={`/posts/${post.slug}/inspire`}>Inspire</a>
      <a class="btn btn-outline btn-secondary" href={`/posts/${post.slug}#delete`}>Delete</a>
    </div>
  </div>

  {#if errorMessage}
    <div class="error-message text-red-500 p-4">
      <p>Error loading subposts: {errorMessage}</p>
    </div>
  {/if}

  {#if subPosts.length > 0}
    <div class="subposts-container mt-4 p-4">
      <h4 class="subposts-title font-bold">Related Subposts:</h4>
      <div class="grid grid-cols-1 gap-4">
        {#each subPosts as subPost (subPost.id)}
          <SubPostCard {subPost} />
        {/each}
      </div>
    </div>
  {/if}
</div>
