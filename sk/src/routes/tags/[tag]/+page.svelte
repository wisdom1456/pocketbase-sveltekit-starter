<script lang="ts">
import type {
  PostsResponse,
  TagsResponse,
} from "$lib/pocketbase/generated-types";
import { onMount } from "svelte";
import { page } from "$app/stores";
import { client } from "$lib/pocketbase";
import PostList from "$lib/components/PostList.svelte";
import LoginGuard from "$lib/components/LoginGuard.svelte";

let posts: PostsResponse[] = [];
let tag: TagsResponse | undefined;

onMount(async () => {
  const { tag: tagTitle } = $page.params;
  try {
    // Fetch the tag record by title
    const tagResponse = await client
      .collection("tags")
      .getFirstListItem(`title = '${tagTitle}'`);
    tag = tagResponse as unknown as TagsResponse;

    if (tag) {
      // Fetch the posts related to the tag
      const response = await client.collection("posts").getList(1, 50, {
        filter: `tags ~ '${tag.id}'`,
        expand: "featuredImage,tags",
      });
      posts = response.items as unknown as PostsResponse[];
      console.log("posts", posts);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});
</script>

<LoginGuard>
  <div class="container mx-auto px-4">
    {#if tag}
      <h1 class="mb-8 text-4xl font-bold">Blogs tagged with "{tag.title}"</h1>

      {#if posts.length > 0}
        <PostList posts={posts} />
      {:else}
        <p>No blogs found with the tag "{tag.title}".</p>
      {/if}
    {:else}
      <p>Tag not found.</p>
    {/if}
  </div>
</LoginGuard>
