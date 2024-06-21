<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchPosts, fetchSubpostsByPostId } from '$lib/services/postService';
    import type { PostsResponse, SubpostsResponse, TagsResponse } from '$lib/pocketbase/generated-types'; // Ensure this matches your actual exports
    import { writable } from 'svelte/store';
    import { client } from '$lib/pocketbase';
  
    let posts: PostsResponse[] = [];
    let sortedPosts: PostsResponse[] = [];
    let subposts: SubpostsResponse[] = [];
    let selectedPostId: string = '';
    let errorMessage: string = '';
    let sortOption: 'ABC' | 'Recent' = 'Recent';
    let scratchPadContent: string = '';
    let groups = writable<{ name: string, posts: PostsResponse[] }[]>([]);
    let newGroupName: string = '';
    let selectedPosts = writable<Set<string>>(new Set());
  
    async function loadPosts() {
      try {
        const fetchedPosts = await fetchPosts();
        if (fetchedPosts) {
          posts = fetchedPosts;
          sortPosts();
        } else {
          errorMessage = 'Failed to load posts';
        }
      } catch (error) {
        errorMessage = 'Failed to load posts';
      }
    }
  
    function sortPosts() {
      if (sortOption === 'ABC') {
        sortedPosts = [...posts].sort((a, b) => a.title.localeCompare(b.title));
      } else {
        sortedPosts = [...posts].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      }
    }
  
    async function loadSubposts(postId: string) {
      try {
        selectedPostId = postId;
        subposts = await fetchSubpostsByPostId(postId);
      } catch (error) {
        errorMessage = 'Failed to load subposts';
      }
    }
  
    function addGroup() {
      groups.update(gs => {
        const newPosts = posts.filter(post => {
          let selected: boolean = false;
          selectedPosts.subscribe(s => selected = s.has(post.id))();
          return selected;
        });
        gs.push({ name: newGroupName, posts: newPosts });
        return gs;
      });
      newGroupName = '';
      selectedPosts.set(new Set());
    }
  
    function togglePostSelection(postId: string) {
      selectedPosts.update(sp => {
        const newSet = new Set(sp);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
    }
  
    onMount(() => {
      loadPosts();
    });
  
    $: if (posts.length > 0) {
      sortPosts();
    }
  </script>
  
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Inspiration Dashboard</h1>
    <div class="flex justify-between mb-4">
      <div>
        <button
          class="btn btn-primary mr-2"
          on:click={() => { sortOption = 'Recent'; sortPosts(); }}>
          Sort by Recent
        </button>
        <button
          class="btn btn-primary"
          on:click={() => { sortOption = 'ABC'; sortPosts(); }}>
          Sort by ABC
        </button>
      </div>
      <div>
        <textarea
          class="textarea textarea-primary"
          bind:value={scratchPadContent}
          placeholder="Scratch pad for your ideas..."
          rows="4"
          cols="50"></textarea>
      </div>
    </div>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        class="input input-bordered"
        placeholder="New group name"
        bind:value={newGroupName} />
      <button class="btn btn-primary ml-2" on:click={addGroup}>Add Group</button>
    </div>
    {#if errorMessage}
      <div class="alert alert-error">{errorMessage}</div>
    {:else if posts.length === 0}
      <div class="alert alert-info">No posts available</div>
    {:else}
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th><input type="checkbox" class="checkbox" /></th>
              <th>Title</th>
              <th>Tags</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each sortedPosts as post}
              <tr class="hover">
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" on:change={() => togglePostSelection(post.id)} />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        {#if post.expand?.featuredImage}
                          {@const imageRecord = post.expand.featuredImage}
                          {@const imageUrl = imageRecord?.file ? client.getFileUrl(imageRecord, imageRecord.file) : ''}
                          <img src={imageUrl} alt={post.title} class="w-full h-full object-cover" />
                        {:else}
                          <img src="https://via.placeholder.com/800x400.png?text=AI+Blog" alt="Placeholder" class="w-full h-full object-cover" />
                        {/if}
                      </div>
                    </div>
                    <div>
                      <div class="font-bold"><a href={`/posts/${post.slug}`} class="link link-hover">{post.title}</a></div>
                      <div class="text-sm opacity-50">{post.expand?.tags?.map(tag => tag.title).join(', ')}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {#each post.expand?.tags as tag}
                    <span class="badge badge-ghost badge-sm">{tag.title}</span>
                  {/each}
                </td>
                <td>{new Date(post.created).toLocaleDateString()}</td>
                <th>
                  <button class="btn btn-ghost btn-xs" on:click={() => loadSubposts(post.id)}>details</button>
                </th>
              </tr>
            {/each}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Tags</th>
              <th>Date</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    {/if}
  
    {#if selectedPostId}
      <div class="mt-6">
        <h2 class="text-2xl font-bold">Subposts:</h2>
        {#if subposts.length > 0}
          <ul class="list-disc pl-5">
            {#each subposts as subpost}
              <li>
                <a href={`/subposts/${subpost.id}`} class="link link-hover">{subpost.title}</a>
              </li>
            {/each}
          </ul>
        {:else}
          <div class="alert alert-info">No subposts available for this post.</div>
        {/if}
      </div>
    {/if}
  
    <div class="mt-6">
      <h2 class="text-2xl font-bold">Groups:</h2>
      {#each $groups as group}
        <div>
          <h3 class="text-xl font-bold">{group.name}</h3>
          <ul class="list-disc pl-5">
            {#each group.posts as post}
              <li>
                <a href={`/posts/${post.slug}`} class="link link-hover">{post.title}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .hover:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
  </style>
  