<script lang="ts">
import { client, authModel } from '$lib/pocketbase';
import type { Record, Admin } from 'pocketbase';
import { onMount } from 'svelte';

let user: Record | Admin | null = null;
let name = '';
let email = '';
let avatar: string | Blob | null = null;
let successMessage = '';
let errorMessage = '';

onMount(async () => {
  user = $authModel;
  if (user) {
    name = user.name || '';
    email = user.email || '';
  }
});

async function handleFileChange(
  event: Event & { currentTarget: EventTarget & HTMLInputElement }
) {
  avatar = event.currentTarget.files?.[0] || null;
}

async function updateProfile() {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    if (user) {
      await client.collection('users').update(user.id, formData);
      successMessage = 'Profile updated successfully!';
      errorMessage = '';
    } else {
      throw new Error('User is null');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    errorMessage = 'Failed to update profile.';
    successMessage = '';
    errorMessage = 'Failed to update profile.';
    successMessage = '';
  }
}
</script>

{#if user}
  <form
    on:submit|preventDefault={updateProfile}
    class="mx-auto max-w-md space-y-4"
  >
    <div class="form-control">
      <label for="name" class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        id="name"
        bind:value={name}
        required
        class="input input-bordered"
      />
    </div>
    <div class="form-control">
      <label for="email" class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        class="input input-bordered"
      />
    </div>
    <div class="form-control">
      <label for="avatar" class="label">
        <span class="label-text">Avatar</span>
      </label>
      <input
        type="file"
        id="avatar"
        on:change|preventDefault={handleFileChange}
        accept="image/*"
        class="file-input"
      />
    </div>
    {#if successMessage}
      <div class="alert alert-success shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m1-4h.01M4 6h16M4 10h16m-7 6h7m-7 4h7"
            ></path></svg
          >
          <span>{successMessage}</span>
        </div>
      </div>
    {/if}
    {#if errorMessage}
      <div class="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path></svg
          >
          <span>{errorMessage}</span>
        </div>
      </div>
    {/if}
    <button type="submit" class="btn btn-primary w-full">Update Profile</button>
  </form>
{:else}
  <div class="flex h-full items-center justify-center">
    <div class="alert alert-info shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          ></path></svg
        >
        <span>Loading user data...</span>
      </div>
    </div>
  </div>
{/if}
