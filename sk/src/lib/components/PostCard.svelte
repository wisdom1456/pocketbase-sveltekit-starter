<script lang="ts">
  import type { PostsResponse } from "$lib/pocketbase/generated-types";
  import Markdown from "svelte-markdown";
  import TagGroup from "$lib/components/TagGroup.svelte";
  import { client } from "$lib/pocketbase";
  import Delete from "./Delete.svelte";
  
  export let post: PostsResponse;
  
  async function getFeaturedImageUrl(post: any) {
    if (post.featuredImage) {
      const image = await client.collection("images").getOne(post.featuredImage);
      if (image && image.file) {
        return client.getFileUrl(image, image.file);
      }
    }
    return "https://via.placeholder.com/800x400.png?text=AI+Blog";
  }
  </script>
  
  <div class="card bg-base-100 shadow-xl">
    <figure>
      {#await getFeaturedImageUrl(post)}
        <img
          src="https://via.placeholder.com/800x400.png?text=Loading..."
          alt="Loading..."
          class="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
      {:then featuredImageUrl}
        <img
          src={featuredImageUrl}
          alt={post.title}
          class="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
      {/await}
    </figure>
    <div class="card-body">
      <div class="prose items-center gap-x-4">
        <time datetime={post.updated} class="text-accent">
          {new Date(post.updated).toLocaleDateString()}
        </time>
      </div>
      <div class="group relative mt-3">
        <a
          href={`/posts/${post.slug}`}
          class="prose-lg text-primary hover:text-secondary font-bold"
        >
          {post.title}
        </a>
        <div class="prose-sm text-base-content mt-3 line-clamp-6">
          <Markdown source={post.blogSummary} />
        </div>
      </div>
      <TagGroup post={post} />
      <div class="card-actions mt-4 justify-between">
        <a class="btn btn-outline" href={`/posts/${post.slug}/edit`}>Edit</a>
        
        <a class="btn btn-outline" href={`/posts/${post.slug}/inspire`}>Inspire</a>
        <a class="btn btn-outline btn-secondary" href={`/posts/${post.slug}#delete`}>Delete</a>
      </div>
    </div>
  </div>
  