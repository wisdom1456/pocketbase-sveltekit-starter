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
        class="tag hover:bg-primary-focus mb-2 mr-2 inline-block cursor-pointer bg-primary-content px-2 py-1 text-sm text-accent"
      >
        #{tag}
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
