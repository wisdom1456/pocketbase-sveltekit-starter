<script lang="ts" context="module">
  import { beforeNavigate } from '$app/navigation';
  import { metadata } from '$lib/app/stores';
  import { site } from '$lib/config';
  import PocketBase from 'pocketbase';
  
  // Initialize PocketBase client
  const pb = new PocketBase(`$(import.meta.env.VITE_APP_BASE_URL)`);
  </script>
  
  <script lang="ts">
  import '../app.scss';
  import Alerts from '$lib/components/Alerts.svelte';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';
  
  let showScrollTopButton = false;
  
  $: title = $metadata.title ? $metadata.title + ' | ' + site.name : site.name;
  $: description = $metadata.description ?? site.description;
  $: headline = $metadata.headline ?? $metadata.title;
  
  beforeNavigate(() => {
    $metadata = {};
  });
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function handleScroll() {
    showScrollTopButton = window.scrollY > 100;
  }
  
  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  </script>
  
  <svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </svelte:head>
  
  <div class="flex h-screen min-h-screen flex-col">
    <header class="sticky top-0 z-50 bg-base-100 shadow-lg">
      <Nav />
    </header>
  
    <main class="flex-grow">
      <div class="pt-4">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <Alerts />
          </div>
          <slot />
        </div>
      </div>
    </main>
  
    <Footer />
  </div>
  
  {#if showScrollTopButton}
    <button
      class="fixed bottom-4 right-4 btn btn-primary rounded-full"
      on:click={scrollToTop}
    >
      ↑ Top
    </button>
  {/if}
  