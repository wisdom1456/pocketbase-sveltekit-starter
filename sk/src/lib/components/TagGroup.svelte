<script lang="ts">
  import type { PostsResponse } from '$lib/pocketbase/generated-types';

  export let post: PostsResponse;
  export let tags: string[] = post.tags || [];
  export let mode: 'main' | 'few' | 'all' = 'few';

  $: if (post && post.expand && post.expand.tags) {
    tags = post.expand.tags.map((tag: { title: string }) => tag.title);
  }

  let displayedTags: string[] = [];
  $: if (mode === 'main' && tags.length > 0) {
    displayedTags = [tags[0]];
  } else if (mode === 'few' && tags.length > 0) {
    displayedTags = tags.slice(0, 3);
  } else if (mode === 'all') {
    displayedTags = tags;
  }
</script>

{#if displayedTags.length > 0}
  <div class="flex flex-wrap text-primary">
    {#each displayedTags as tag, i (tag)}
      <a
        href={`/tags/${tag}`}
        class="badge badge-accent cursor-pointer text-xs"
      >
        {tag}
      </a>
    {/each}
  </div>
{:else}
  <div class="px-6 pb-2 pt-4 text-sm font-semibold">No tags</div>
{/if}
