<script lang="ts">
  import type {
    PostsResponse,
    SubpostsResponse,
  } from '$lib/pocketbase/generated-types';
  import { client } from '$lib/pocketbase';
  import { onMount, createEventDispatcher } from 'svelte';
  import { fetchSubpostsByPostId } from '$lib/services/postService';
  import { goto } from '$app/navigation';

  export let post: PostsResponse;
  export let featuredImage: string = ''; // Add this line to accept the featured image URL as a prop

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

<article
  class="relative isolate flex max-w-xl flex-col overflow-hidden shadow-lg bg-primary transition-shadow hover:shadow-2xl"
>
  <div class="relative h-48 w-full ">
    {#if featuredImage}
      <img
        src={featuredImage}
        alt={post.title}
        class="absolute inset-0 h-full w-full object-cover"
      />
    {:else if post.expand?.featuredImage}
      {@const imageRecord = post.expand.featuredImage}
      {@const imageUrl = imageRecord?.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
      <img
        src={imageUrl}
        alt={post.title}
        class="absolute inset-0 h-full w-full object-cover"
      />
    {:else}
      <img
        src="https://via.placeholder.com/800x400.png?text=AI+Blog"
        alt="Placeholder"
        class="absolute inset-0 h-full w-full object-cover"
      />
    {/if}
    <div class="from-primary to-secondary absolute inset-0 bg-gradient-to-b opacity-80"></div>
  </div>

  <div class="p-8">
    <div class="text-accent flex items-center justify-between text-xs">
      {#if post?.updated}
        <time datetime={post.updated} class="text-primary-content">
          {new Date(post.updated).toLocaleDateString()}
        </time>
      {/if}
      {#if post.expand && post.expand.tags[0]}
        <a
          href={`/tags/${post.expand.tags[0].title}`}
          class="bg-secondary text-secondary-content hover:bg-accent hover:text-accent-content relative z-10 rounded-md px-2 py-1 font-medium"
        >
          {post.expand.tags[0].title}
        </a>
      {/if}
    </div>

    <div class="mt-4">
      <h3
        class="text-primary-content group-hover:text-accent-content text-lg font-semibold leading-6 text-center"
      >
        {#if post.slug}
          <a href={`/posts/${post.slug}`}>
            <span class="absolute inset-0"></span>
            {post.title}
          </a>
        {/if}
      </h3>
      <p class="text-secondary-content mt-5 text-sm leading-6 text-justify ">
        {post.blogSummary}
      </p>
    </div>
  </div>
</article>
