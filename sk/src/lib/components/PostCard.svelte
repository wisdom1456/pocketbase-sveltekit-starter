<script lang="ts">
import type { PostsResponse } from '$lib/pocketbase/generated-types';
import Markdown from 'svelte-markdown';
import TagGroup from '$lib/components/TagGroup.svelte';
import Delete from './Delete.svelte';
import { client } from '$lib/pocketbase';
export let post: PostsResponse;
import SubPostCard from '$lib/components/SubPostCard.svelte';
import { onMount } from 'svelte';

let subPosts: string | any[] = [];

onMount(async () => {
  // Fetch subposts for the current post
  const subpostsResponse = await client.collection('subpost').getFullList({
    filter: `post.id = "${post.id}"`,
    expand: 'post',
  });

  if (subpostsResponse) {
    subPosts = subpostsResponse;
  }
});
</script>

<div
  class="border-3 card border-secondary bg-base-100 m-2 flex flex-1 flex-col justify-between border shadow-xl"
>
  <div>
    <figure>
      <!-- PostCard.svelte -->
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
    <div class="">
      <div class="prose items-center p-2">
        <time datetime={post.updated} class="text-accent">
          {new Date(post.updated).toLocaleDateString()}
        </time>
      </div>
      <div class="group relative px-2">
        <a
          href={`/posts/${post.slug}`}
          class="prose-lg text-primary hover:text-secondary font-bold"
        >
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
      <TagGroup post={post} />
      <div class="card-actions mt-4 justify-between">
        <a class="btn btn-outline" href={`/posts/${post.slug}/edit`}>Edit</a>
        <a class="btn btn-outline" href={`/posts/${post.slug}/inspire`}
          >Inspire</a
        >
        <a
          class="btn btn-outline btn-secondary"
          href={`/posts/${post.slug}#delete`}>Delete</a
        >
      </div>
    </div>
  </div>

  <!-- Subposts section -->
  {#if post.expand?.subpost && post.expand.subpost.length > 0}
    <div class="subposts-container mt-4">
      <h4 class="subposts-title font-bold">Related Subposts:</h4>
      {#each post.expand.subpost as subpost}
        <SubPostCard subPost={subpost} />
      {/each}
    </div>
  {/if}
</div>
