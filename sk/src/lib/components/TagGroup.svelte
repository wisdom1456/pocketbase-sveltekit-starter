<script lang="ts">
import { fade, scale } from "svelte/transition";
import { client } from "$lib/pocketbase";
import type {
  PostsResponse,
  PostsRecord,
} from "$lib/pocketbase/generated-types";
export let post: PostsResponse;

export let tags: string[] = [];

async function loadTags() {
  if (post.expand?.tags) {
    tags = post.expand.tags.map((tag: { title: any }) => tag.title);
  } 
}

$: {
  if (post) {
    loadTags();
  }
}
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap  pb-2 pt-4" in:fade={{ duration: 400 }}>
    {#each tags as tag, i (tag)}
      {#if i < 2}
        <a
          href={`/tags/${tag}`}
          class="tag bg-primary text-primary-content hover:bg-primary-focus mb-2 mr-2 inline-block cursor-pointer rounded-full px-2 py-1 text-sm font-semibold"
          in:scale={{ delay: i * 100, duration: 500 }}
          out:fade={{ duration: 300 }}
        >
          #{tag}
        </a>
      {/if}
    {/each}
  </div>
{:else}
  <div class="px-6 pb-2 pt-4 text-sm font-semibold" in:fade={{ duration: 400 }}>
    No tags
  </div>
{/if}

<style>
.tag:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>
