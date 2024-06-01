<script lang="ts">
  import type { Record, Admin } from 'pocketbase';
  import { onDestroy } from 'svelte';
  import { authModel, client } from '../pocketbase';
  import { goto } from '$app/navigation';
  import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
  import Dialog from './Dialog.svelte';
  import LoginForm from './LoginForm.svelte';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isDialogOpen = false;
  let isDropdownOpen = false;
  let isThemeModalOpen = false;

  async function logout() {
    goto('/');
    client.authStore.clear();
    isDialogOpen = false;
    isDropdownOpen = false;
    console.log("Logout clicked");
  }

  function getFileUrl(authModel: Record | Admin, avatar: any) {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL + 'api/files/_pb_users_auth_';
    const userId = authModel.id;
    const fileName = avatar;
    const token = client.authStore.token;
    return `${baseUrl}/${userId}/${fileName}?token=${token}`;
  }

  const unsubscribe = client.authStore.onChange((token, model) => {
    console.log("Auth state changed:", { token, model });
  }, false);

  onDestroy(() => {
    unsubscribe();
  });

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest(".dropdown") && !target.closest("dialog")) {
      isDropdownOpen = false;
      isThemeModalOpen = false;
      console.log("Clicked outside, closing dropdown and modal");
    }
  }

  function handleThemeSelected() {
    isDropdownOpen = false;
    isThemeModalOpen = false;
    console.log("Theme selected, closing dropdown and modal");
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    console.log("Mounted, added click event listener");
    return () => {
      document.removeEventListener("click", handleClickOutside);
      console.log("Unmounted, removed click event listener");
    };
  });
</script>

{#if $authModel}
  <div class="relative inline-block text-left">
    <button
      class="dropdown"
      on:click={() => {
        isDropdownOpen = !isDropdownOpen;
        console.log("Dropdown button clicked, state:", isDropdownOpen);
      }}
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
    >
      <div tabindex="0" role="button" class="btn">
        {$authModel?.name || $authModel?.username || 'User'}
      </div>
    </button>
    {#if isDropdownOpen}
      <ul class="menu dropdown-content rounded-box bg-base-200 absolute right-0 z-[1] mt-2 w-52 p-2 shadow">
        <li>
          <button
            class="flex"
            title="View profile"
            on:click={() => goto('/profile')}
          >
            <img
              alt="Profile"
              src={getFileUrl($authModel, $authModel?.avatar)}
              class="w-8 rounded-full"
            />
            <div class="flex flex-col">
              <h3 class="font-bold">{$authModel?.name}</h3>
              <span class="text-accent text-xs">{$authModel?.email}</span>
            </div>
          </button>
        </li>
        <div class="divider my-0"></div>
        <li><button on:click={() => goto('/settings')}>Settings</button></li>
        <li>
          <button on:click={() => goto('/keyboard-shortcuts')}>Keyboard Shortcuts</button>
        </li>
        <li><button on:click={(event) => {
          event.stopPropagation();
          isThemeModalOpen = true;
          console.log("Change Theme clicked, state:", isThemeModalOpen);
        }}>Change Theme</button></li>
        <div class="divider my-0"></div>
        <li><button on:click={() => goto('/help')}>Help</button></li>
        <li><button on:click={logout}>Sign out</button></li>
      </ul>
    {/if}
  </div>
{:else}
  <button class="btn btn-primary" on:click={() => {
    isDialogOpen = true;
    console.log("Sign In clicked, state:", isDialogOpen);
  }}>
    Sign In
  </button>
{/if}
<Dialog bind:open={isDialogOpen}>
  {#if $authModel}
    <div transition:fly={{ y: -10, duration: 200 }}>
      <button on:click={logout}>Sign Out</button>
    </div>
  {:else}
    <div transition:fly={{ y: -10, duration: 200 }}>
      <LoginForm />
    </div>
  {/if}
</Dialog>

<Dialog bind:open={isThemeModalOpen}>
  <ThemeSwitch on:themeSelected={handleThemeSelected} />
</Dialog>
