<script lang="ts">
  import type { PostsResponse } from '$lib/pocketbase/generated-types';
  import Markdown from 'svelte-markdown';
  import TagGroup from '$lib/components/TagGroup.svelte';
  import { client } from '$lib/pocketbase';
  import SubPostCard from '$lib/components/SubPostCard.svelte';
  import { onMount } from 'svelte';
  
  export let post: PostsResponse;
  
  let subPosts: any[] = [];
  
  onMount(async () => {
    try {
      const subpostsResponse = await client.collection('subpost').getFullList({
        filter: `post.id = "${post.id}"`,
        expand: 'post',
      });
  
      if (subpostsResponse) {
        subPosts = subpostsResponse;
      }
    } catch (error) {
      console.error('Error fetching subposts:', error);
    }
  });
  </script>
  
  <div class="border-3 card border-secondary bg-base-100 m-2 flex flex-1 flex-col justify-between border shadow-xl">
    <div>
      <figure>
        {#if post.expand?.featuredImage}
          {@const imageRecord = post.expand.featuredImage}
          {@const imageUrl = imageRecord && imageRecord.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
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
      <div class="p-2">
        <div class="prose items-center">
          <time datetime={post.updated} class="text-accent">
            {new Date(post.updated).toLocaleDateString()}
          </time>
        </div>
        <div class="group relative px-2">
          <a href={`/posts/${post.slug}`} class="prose-lg text-primary hover:text-secondary font-bold">
            {post.title}
          </a>
          <div class="prose-sm text-base-content mt-3 line-clamp-6 text-justify">
            <Markdown source={post.blogSummary} />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="p-2">
        <TagGroup {post} />
        <div class="card-actions mt-4 justify-between">
          <a class="btn btn-outline" href={`/posts/${post.slug}/edit`}>Edit</a>
          <a class="btn btn-outline" href={`/posts/${post.slug}/inspire`}>Inspire</a>
          <a class="btn btn-outline btn-secondary" href={`/posts/${post.slug}#delete`}>Delete</a>
        </div>
      </div>
    </div>
  
    {#if subPosts.length > 0}
      <div class="subposts-container mt-4">
        <h4 class="subposts-title font-bold">Related Subposts:</h4>
        {#each subPosts as subPost}
            <SubPostCard {subPost} />
        {/each}
      </div>
    {/if}
  </div>
  
  <style>
  /* Add relevant styles */
  </style>
  