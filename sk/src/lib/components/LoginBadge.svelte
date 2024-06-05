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
  let activeTab = 'SignIn'; // Default to SignIn tab
  
  async function logout() {
    goto('/');
    client.authStore.clear();
    isDialogOpen = false;
    isDropdownOpen = false;
    console.log('Logout clicked');
  }
  
  function getFileUrl(authModel: Record | Admin, avatar: any) {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL + 'api/files/_pb_users_auth_';
    const userId = authModel.id;
    const fileName = avatar;
    const token = client.authStore.token;
    return `${baseUrl}/${userId}/${fileName}?token=${token}`;
  }
  
  const unsubscribe = client.authStore.onChange((token, model) => {
    console.log('Auth state changed:', { token, model });
  }, false);
  
  onDestroy(() => {
    unsubscribe();
  });
  
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.dropdown') && !target.closest('dialog') && !target.closest('.btn')) {
      isDropdownOpen = false;
      isThemeModalOpen = false;
      isDialogOpen = false;
      console.log('Clicked outside, closing dropdown and modal');
    }
  }
  
  function handleThemeSelected() {
    isDropdownOpen = false;
    isThemeModalOpen = false;
    console.log('Theme selected, closing dropdown and modal');
  }
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    console.log('Mounted, added click event listener');
    return () => {
      document.removeEventListener('click', handleClickOutside);
      console.log('Unmounted, removed click event listener');
    };
  });
  </script>
  
  {#if $authModel}
    <div class="relative inline-block text-left">
      <button
        class="dropdown"
        on:click={(event) => {
          event.stopPropagation();
          isDropdownOpen = !isDropdownOpen;
          console.log("Dropdown button clicked, state:", isDropdownOpen);
        }}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <div tabindex="0" role="button" class="btn btn-ghost text-lg normal-case text-primary">
          {$authModel?.name || $authModel?.username || 'User'}
        </div>
      </button>
      {#if isDropdownOpen}
        <ul
          class="menu dropdown-content absolute right-0 z-[1] mt-2 w-52 rounded-box bg-base-200 p-2 shadow"
        >
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
                <span class="text-xs text-accent">{$authModel?.email}</span>
              </div>
            </button>
          </li>
          <div class="divider my-0"></div>
          <li><button on:click={() => goto('/settings')}>Settings</button></li>
          <li>
            <button on:click={() => goto('/keyboard-shortcuts')}
              >Keyboard Shortcuts</button
            >
          </li>
          <li>
            <button
              on:click={(event) => {
            event.stopPropagation();
            isThemeModalOpen = true;
            console.log("Change Theme clicked, state:", isThemeModalOpen);
          }}
              >Change Theme</button
            >
          </li>
          <div class="divider my-0"></div>
          <li><button on:click={() => goto('/help')}>Help</button></li>
          <li><button on:click={logout}>Sign out</button></li>
        </ul>
      {/if}
    </div>
  {:else}
    <button
      class="btn btn-primary"
      on:click={(event) => {
        event.stopPropagation();
        isDialogOpen = true;
        console.log("Sign In clicked, state:", isDialogOpen);
      }}
    >
      Sign In
    </button>
  {/if}
  
  <!-- Ensure Dialog component is correctly bound to isDialogOpen -->
  <Dialog bind:open={isDialogOpen}>
    <div class="tabs">
      <button
        class="tab tab-bordered {activeTab === 'SignIn' ? 'tab-active' : ''}"
        on:click={() => activeTab = 'SignIn'}
      >
        Sign In
      </button>
      <button
        class="tab tab-bordered {activeTab === 'SignUp' ? 'tab-active' : ''}"
        on:click={() => activeTab = 'SignUp'}
      >
        Sign Up
      </button>
    </div>
    {#if activeTab === 'SignIn'}
      <div transition:fly={{ y: -10, duration: 200 }}>
        <LoginForm mode="signin" />
      </div>
    {:else if activeTab === 'SignUp'}
      <div transition:fly={{ y: -10, duration: 200 }}>
        <LoginForm mode="signup" />
      </div>
    {/if}
  </Dialog>
  
  <Dialog bind:open={isThemeModalOpen}>
    <ThemeSwitch on:themeSelected={handleThemeSelected} />
  </Dialog>
  