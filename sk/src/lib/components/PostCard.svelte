<script lang="ts">
  import type { PostsResponse, SubpostsResponse } from '$lib/pocketbase/generated-types';
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

<!-- Card -->
<article class="flex flex-col bg-base-300 rounded-box max-w-xl overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
    <!-- Image -->
    <div class="bg-cover bg-center rounded-t-box w-full h-72 relative">
        {#if featuredImage}
            <img src={featuredImage} alt={post.title} class="absolute inset-0 h-full w-full object-cover rounded-t-box"/>
        {:else if post.expand?.featuredImage}
            {@const imageRecord = post.expand.featuredImage}
            {@const imageUrl = imageRecord?.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
            <img src={imageUrl} alt={post.title} class="absolute inset-0 h-full w-full object-cover rounded-t-box"/>
        {:else}
            <img src="https://via.placeholder.com/800x400.png?text=AI+Blog" alt="Placeholder" class="absolute inset-0 h-full w-full object-cover rounded-t-box"/>
        {/if}
        <div class="from-primary to-secondary absolute inset-0 bg-gradient-to-b opacity-20 rounded-t-box"></div>
    </div>

    <!-- Body -->
    <div class="flex flex-col gap-6 p-6">
        {#if post.slug}
          <a href={`/posts/${post.slug}`}>
            <span class="link link-hover text-xl font-bold">
            {post.title}</span>
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
    </div>
</article>
