<script lang="ts">
  export let mode: 'signin' | 'signup' = 'signin';
  
  import { client, providerLogin } from '../pocketbase';
  let email: string = '';
  let name: string = '';
  let password: string = '';
  let passwordConfirm: string = '';
  let errorMessage: string = '';
  let successMessage: string = '';
  
  async function submit() {
    try {
      if (mode === 'signup') {
        await client.collection('users').create({
          email,
          name,
          password,
          passwordConfirm,
        });
        successMessage = 'User created successfully!';
      } else {
        await client.collection('users').authWithPassword(email, password);
        successMessage = 'User authenticated successfully!';
      }
    } catch (error) {
      console.error('Authentication error:', error);
      errorMessage = 'Failed to authenticate user. Please check your credentials.';
    }
  }
</script>

<form on:submit|preventDefault={submit} class="flex max-w-md flex-col gap-4 rounded-box bg-base-200 p-6">
  {#if mode === 'signup'}
    <h1 class="self-center text-3xl font-bold">Create an account</h1>
  {:else}
    <h1 class="self-center text-3xl font-bold">Log in</h1>
  {/if}

  <label class="form-control">
    <span class="label-text">Email</span>
    <input class="input input-bordered" type="email" bind:value={email} required placeholder="Email" autocomplete="email" />
  </label>

  {#if mode === 'signup'}
    <label class="form-control">
      <span class="label-text">Name</span>
      <input class="input input-bordered" type="text" bind:value={name} required placeholder="Name" autocomplete="name" />
    </label>
  {/if}

  <label class="form-control">
    <span class="label-text">Password</span>
    <input class="input input-bordered" type="password" bind:value={password} required placeholder="Password" autocomplete="current-password" />
  </label>

  {#if mode === 'signup'}
    <label class="form-control">
      <span class="label-text">Confirm Password</span>
      <input class="input input-bordered" type="password" bind:value={passwordConfirm} required placeholder="Confirm Password" autocomplete="new-password" />
    </label>
  {/if}

  <button class="btn btn-primary" type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</button>

  {#if errorMessage}
    <div class="alert alert-error">{errorMessage}</div>
  {/if}
  {#if successMessage}
    <div class="alert alert-success">{successMessage}</div>
  {/if}
</form>
