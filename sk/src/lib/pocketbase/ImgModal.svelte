<script lang="ts">
import type { Record } from 'pocketbase';
import { client } from '.';
import Dialog from '$lib/components/Dialog.svelte';

export let record: Record;
export let filename: string;
export let thumbOnly = false;
</script>

{#if record && filename}
  {#await client.getFileUrl(record, filename, { thumb: "100x100" }) then src}
    <Dialog open={true}>
      <img
        src={src}
        alt="Image thumbnail"
        class="thumbnail"
        aria-hidden="true"
      />
      {#if !thumbOnly}
        {#await client.getFileUrl(record, filename) then fullSrc}
          <img src={fullSrc} alt="Full image" aria-hidden="true" />
        {/await}
      {/if}
    </Dialog>
  {/await}
{/if}

<style lang="scss">
.thumbnail {
  cursor: pointer;
  border-radius: 5px;
  box-shadow: //
    0 0 5px 0px black;
}
</style>
