<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { client } from "$lib/pocketbase";
    import type { SubpostsResponse } from "$lib/pocketbase/generated-types";
    import Markdown from "svelte-markdown";
    import LoginGuard from "$lib/components/LoginGuard.svelte";
  
    let subpost: SubpostsResponse | undefined;
    $: slug = $page.params.slug;
  
    onMount(async () => {
      try {
        subpost = await client.collection('subposts').getFirstListItem(`slug="${slug}"`);
        if (!subpost) {
          console.log("Subpost not found");
          // Handle the case when the subpost is not found
          // For example, you can redirect to a 404 page or show an error message
        }
      } catch (error) {
        console.error("Error fetching subpost:", error);
        // Handle the error case
        // For example, you can show an error message to the user
      }
    });
  </script>
  
  <LoginGuard>
    {#if subpost}
      <div class="prose prose-sm mx-auto p-4 sm:prose lg:prose-lg xl:prose-xl">
        <article class="prose mx-auto lg:prose-lg">
          <h1 class="text-3xl font-bold mb-4">{subpost.title}</h1>
          <Markdown source={subpost.content} />
        </article>
      </div>
    {:else}
      <p>Loading subpost...</p>
    {/if}
  </LoginGuard>
  