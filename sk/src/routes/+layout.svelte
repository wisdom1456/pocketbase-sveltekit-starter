<script lang="ts" context="module">
import { beforeNavigate } from "$app/navigation";
import { metadata } from "$lib/app/stores";
import { site } from "$lib/config";
import PocketBase from "pocketbase";

// Initialize PocketBase client
const pb = new PocketBase(`$(import.meta.env.VITE_APP_BASE_URL)`);
</script>

<script lang="ts">
import "../app.scss";
import Alerts from "$lib/components/Alerts.svelte";
import Nav from "$lib/components/Nav.svelte";
import Footer from "$lib/components/Footer.svelte";

$: title = $metadata.title ? $metadata.title + " | " + site.name : site.name;
$: description = $metadata.description ?? site.description;
$: headline = $metadata.headline ?? $metadata.title;

// Reset metadata on navigation so that the new page inherits nothing from the old page
beforeNavigate(() => {
  $metadata = {};
});
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="flex h-screen min-h-screen flex-col">
  <header>
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
