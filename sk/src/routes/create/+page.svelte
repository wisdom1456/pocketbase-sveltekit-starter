<script lang="ts">
  import { authModel, client } from '$lib/pocketbase';
  import { alertOnFailure } from '$lib/pocketbase/ui';
  import { introPrompt } from '$lib/utils/prompts';
  import { onMount } from 'svelte';
  import type {
    PostsResponse,
    PostsRecord,
    SubpostsResponse,
  } from '$lib/pocketbase/generated-types';
  import { createEventDispatcher } from 'svelte';
  import ServiceSelector from '$lib/components/ServiceSelector.svelte';
  import { availableServices } from '$lib/utils/api';
  import InterpretationList from '$lib/components/InterpretationList.svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  import PostContent from '$lib/components/PostContent.svelte';
  import TagGroup from '$lib/components/TagGroup.svelte';
  import { fly } from 'svelte/transition';
  import ImageWall from '$lib/components/ImageWall.svelte';
  import { generateBlog } from '$lib/services/generateBlog';
  import { fetchUserContent } from '$lib/services/postService';
  
  import { progress } from '$lib/stores/progressStore';
  import { serviceModelSelectionStore } from '$lib/app/stores';
  import LoginGuard from '$lib/components/LoginGuard.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import PostList from '$lib/components/PostList.svelte';
  
  const dispatch = createEventDispatcher();
  let inputText = '';
  
  let selectedService = availableServices[0]?.name;
  let selectedModel = availableServices[0]?.models?.[0];
  let isLoading = {
    content: false,
    title: false,
    tags: false,
    summary: false,
    image: false,
    slug: false,
  };
  let formSubmitted = false;
  let loadingMessage = '';
  let currentStep = 0;
  let chatGptInts: any[] = [];
  let originalPrompt = '';
  let createdPost: PostsResponse | undefined;
  let isAuthenticated = false;
  let post: PostsRecord = {
    title: '',
    slug: '',
    body: '',
    blogSummary: '',
    featuredImage: '',
    prompt: '',
    userid: '',
    tags: [] as string[],
  };
  let posts: PostsResponse[] = [];
  let subposts: SubpostsResponse[] = [];
  let isGeneratingBlog = false;
  let responseText = '';
  let errorMessage = '';
  
  const engineId = 'stable-diffusion-v1-6';
  const apiHost = 'https://api.stability.ai';
  const apiKey = import.meta.env.VITE_STABILITY_API_KEY;
  if (!apiKey) {
    console.error('Missing Stability API key.');
    throw new Error('Missing Stability API key.');
  }
  
  let chatGptPrompt = ''; // Declare chatGptPrompt here
  
  async function callAPI(part: string) {
    progress.set(10);
    console.log(`Progress set to 10: Starting ${part}`);
    try {
      console.log('Calling API...');
      const response = await fetch(`/api/${selectedService.toLowerCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, model: selectedModel }),
      });
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      progress.set(70);
      console.log(`Progress set to 70: ${part} in progress`);
      const data = await response.json();
      console.log('Data:', data);
      responseText = data.result;
      progress.set(100);
      console.log(`Progress set to 100: ${part} completed`);
    } catch (error) {
      responseText = 'Error: ' + (error as Error).message;
      progress.set(0);
      console.log(`Progress reset to 0 due to error in ${part}`);
    }
  }
  
  onMount(async () => {
    isAuthenticated = !!$authModel;
    client.autoCancellation(false);
  
    try {
      const { posts: fetchedPosts, subposts: fetchedSubposts } = await fetchUserContent();
      posts = fetchedPosts;
      subposts = fetchedSubposts;
    } catch (error: any) {
      errorMessage = error.message;
    } finally {
      isLoading.content = false;
    }
  });
  
  async function generateGptInterpretations(promptString: string) {
    if (!$authModel?.id) {
      alert('Please log in to save your post.');
      return;
    }
    currentStep = 1;
    try {
      isLoading.content = true;
      loadingMessage = 'Generating interpretations...';
      progress.set(20);
      console.log('Progress set to 20: Generating interpretations started');
      const interpretationsResponse = (inputText = introPrompt + promptString);
      await callAPI('interpretations');
      console.log('Interpretations Response:', interpretationsResponse);
      originalPrompt = promptString;
      chatGptInts = parseInterpretations(responseText);
      console.log(chatGptInts);
      formSubmitted = true;
    } catch (error) {
      console.error('Error generating interpretations:', error);
    } finally {
      isLoading.content = false;
      progress.set(100);
      console.log(
        'Progress set to 100 in finally block: Generating interpretations completed'
      );
    }
  }
  
  function parseInterpretations(completionText: string) {
    if (!completionText) {
      console.error('No completion text found.');
      return [];
    }
  
    const imageUrls = {
      Optimistic: '/img/optimistic.png',
      Pessimistic: '/img/pessimistic.png',
      Realistic: '/img/realistic.png',
      Creative: '/img/creative.png',
      Analytical: '/img/analytical.png',
      "Devil's Advocate": '/img/advocate.png',
    };
  
    const interpretations = completionText
      .trim()
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const title = line.split(':')[0].trim();
        const text = line.substring(line.indexOf(':') + 1).trim();
  
        return {
          title,
          text,
          imageUrl:
            imageUrls[title as keyof typeof imageUrls] ||
            'https://via.placeholder.com/800x400.png?peace',
        };
      });
  
    console.log(interpretations);
    return interpretations;
  }
  
  function handleInterpretationSelect(
    event: CustomEvent<{ interpretation: string }>
  ) {
    const interpretation = event.detail.interpretation;
    selectInterpretation(interpretation);
  }
  
  function goBack() {
    formSubmitted = false;
  }
  
  function selectInterpretation(interpretation: string) {
    chatGptPrompt = originalPrompt + ' - ' + interpretation;
    isGeneratingBlog = true;
    chatGptInts = [];
    isLoading.content = true;
    loadingMessage = 'Generating blog...';
    progress.set(30);
    console.log('Progress set to 30: Blog generation started');
    generateBlog(chatGptPrompt, engineId, authModel)
      .then((generatedPost) => {
        isLoading.content = false;
        isGeneratingBlog = false;
        progress.set(100);
        console.log('Progress set to 100 after generating blog');
        dispatch('blogGenerated', generatedPost);
      })
      .catch((error) => {
        alertOnFailure(error);
        isLoading.content = false;
        isGeneratingBlog = false;
        progress.set(0);
        console.log('Progress reset to 0 due to error in generating blog');
      });
  }
  </script>
  
  <LoginGuard>
    <div>
      {#if !formSubmitted}
        {#if isLoading.content}
          <LoadingIndicator message="Loading interpretations..." />
        {:else}
          <main
            class="container mx-auto my-12 px-4 sm:px-6 lg:px-8"
            in:fly={{ y: 50, duration: 500 }}
          >
            <form
              on:submit|preventDefault={() => generateGptInterpretations(chatGptPrompt)}
              class="space-y-6 rounded-lg bg-base-200 p-6 shadow"
            >
              <ServiceSelector
                bind:selectedService={selectedService}
                bind:selectedModel={selectedModel}
              />
              <input
                type="text"
                class="input input-bordered w-full bg-base-100"
                bind:value={chatGptPrompt}
                placeholder="Enter thoughts here"
              />
              <div class="text-right">
                <button type="submit" class="btn btn-primary">Generate</button>
              </div>
              <ProgressBar />
              <div class="border-4 border-accent">
                <ImageWall></ImageWall>
              </div>
            </form>
          </main>
        {/if}
      {:else if chatGptInts.length > 0 && !isGeneratingBlog}
        <main
          class="container mx-auto my-12 px-4 sm:px-6 lg:px-8"
          in:fly={{ y: 50, duration: 500 }}
        >
          <InterpretationList
            interpretations={chatGptInts}
            on:select={handleInterpretationSelect}
            on:back={goBack}
          />
        </main>
      {:else if isGeneratingBlog}
        <LoadingIndicator message={loadingMessage} />
      {:else}
        {#key chatGptPrompt}
          {#if post !== undefined}
            <div
              class="prose prose-sm mx-auto p-4 sm:prose lg:prose-lg xl:prose-xl"
              in:fly={{ y: 50, duration: 500 }}
            >
              <figure class="my-4">
                {#if post.featuredImage}
                  <figure class="my-4">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      class="mx-auto rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105"
                    />
                    <figcaption class="mt-2 text-center text-sm">
                      {post.title}
                    </figcaption>
                  </figure>
                {/if}
                <article class="prose mx-auto text-justify lg:prose-lg">
                  {#if isLoading.content}
                    <LoadingIndicator message="Loading content..." />
                  {:else}
                    <PostContent content={post.body} />
                  {/if}
                </article>
  
                <div class="mt-8">
                  <h2 class="text-2xl">Tags</h2>
                  {#if isLoading.tags}
                    <LoadingIndicator message="Loading tags..." />
                  {:else if createdPost}
                    <TagGroup post={createdPost} />
                  {/if}
                </div>
              </figure>
            </div>
          {/if}
        {/key}
      {/if}
  
      <!-- Display user-specific posts -->
      <div class="container mx-auto px-4 py-24">
        <h2 class="mb-12 text-center text-4xl font-bold">Your Posts</h2>
        {#if posts.length > 0}
          <PostList {posts} />
        {:else}
          <p class="text-center text-lg">You have no posts yet.</p>
        {/if}
      </div>
    </div>
  </LoginGuard>
  