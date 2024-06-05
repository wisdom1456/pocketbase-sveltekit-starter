<script lang="ts">
export let open: boolean;

function handleClose() {
  open = false;
  console.log('Dialog closed');
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (target && !target.closest('.modal-box')) {
    handleClose();
    console.log('Clicked outside the dialog, closing dialog');
  }
}

$: if (open) {
  document.addEventListener('click', handleClickOutside);
  console.log('Dialog opened, added click event listener');
} else {
  document.removeEventListener('click', handleClickOutside);
  console.log('Dialog closed, removed click event listener');
}
</script>

<dialog class="modal" open={open} on:close={handleClose}>
  <div class="modal-box">
    <slot />
    <div class="modal-action">
      <button class="btn btn-primary" on:click={handleClose}>Close</button>
    </div>
  </div>
</dialog>
