<script lang="ts">
  import type { PostsResponse } from "$lib/pocketbase/generated-types";

  export let post: PostsResponse;
  export let tags: string[] = post.tags || [];

  $: if (post && post.expand && post.expand.tags) {
    tags = post.expand.tags.map((tag: { title: string }) => tag.title);
  }
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap pb-2 pt-4">
    {#each tags as tag, i (tag)}
    <a
  href={`/tags/${tag}`}
  class="tag border border-secondary m-1 hover:border-accent hover:bg-accent hover:text-accent-content inline-block cursor-pointer bg-primary px-2 text-sm text-primary-content rounded-lg"
>
  {tag}
</a>
  
    {/each}
  </div>
{:else}
  <div class="px-6 pb-2 pt-4 text-sm font-semibold">
    No tags
  </div>
{/if}

<style>
  .tag:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
</style>
