<script lang="ts">
  import type { PostsResponse, SubpostsResponse } from '$lib/pocketbase/generated-types';
  import Markdown from 'svelte-markdown';
  import TagGroup from '$lib/components/TagGroup.svelte';
  import { client } from '$lib/pocketbase';
  import { onMount } from 'svelte';
  import { fetchSubpostsByPostId } from '$lib/services/postService';

  export let post: PostsResponse;

  let subposts: SubpostsResponse[] = [];
  let errorMessage: string = '';

  async function fetchSubPosts() {
    try {
      // Post ID to filter subposts
      const postID = post.id;
      console.log('Post ID:', postID);

      // Fetch subposts using the imported function
      subposts = await fetchSubpostsByPostId(postID);
      console.log('Filtered Subposts:', subposts);

      //subposts = subpostsResponse;
    } catch (error) {
      console.error('Failed to fetch subposts:', error);
      errorMessage = 'Failed to load subposts';
    }
  }

  onMount(() => {
    if (post?.id) {
      fetchSubPosts();
    }
  });
</script>

<div
  class="card border-secondary bg-base-100 m-4 flex flex-col justify-between border shadow-xl"
>
  <figure class="w-full">
    {#if post.expand?.featuredImage}
      {@const imageRecord = post.expand.featuredImage}
      {@const imageUrl = imageRecord?.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
      <img
        src={imageUrl}
        alt={post.title}
        class="aspect-[16/9] w-full rounded-t-lg object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
    {:else}
      <img
        src="https://via.placeholder.com/800x400.png?text=AI+Blog"
        alt="Placeholder"
        class="aspect-[16/9] w-full rounded-t-lg object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
    {/if}
  </figure>
  <div class="p-4">
    <div class="prose items-center">
      {#if post?.updated}
        <time datetime={post.updated} class="text-accent"
          >{new Date(post.updated).toLocaleDateString()}</time
        >
      {/if}
    </div>
    <div class="group relative px-2">
      {#if post?.title}
        <a
          href={`/posts/${post.slug}`}
          class="prose-lg text-primary hover:text-secondary font-bold"
          >{post.title}</a
        >
      {/if}
      {#if post?.blogSummary}
        <div class="prose-sm text-base-content mt-3 line-clamp-6 text-justify">
          <Markdown source={post.blogSummary} />
        </div>
      {/if}
    </div>
  </div>
  <div class="p-4">
    <TagGroup post={post} />
    <div class="card-actions mt-4 justify-between">
      <a class="btn btn-outline" href={`/posts/${post.slug}/edit`}>Edit</a>
      <a class="btn btn-outline" href={`/posts/${post.slug}/inspire`}>Inspire</a>
      <a
        class="btn btn-outline btn-secondary"
        href={`/posts/${post.slug}#delete`}>Delete</a>
    </div>
  </div>

  <div class="p-4">
    {#if subposts.length > 0}
      <h3 class="text-lg font-semibold mt-4">Subposts</h3>
      <ul class="list-none p-0">
        {#each subposts as subpost}
          <li class="m-1">
            <a href={`/subposts/${subpost.slug}`} class="text-sm link link-primary">{subpost.title}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
