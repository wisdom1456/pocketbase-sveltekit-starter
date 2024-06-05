<!-- src/lib/components/ProgressBar.svelte -->
<script>
import { progress } from '../stores/progressStore';
import { onDestroy } from 'svelte';

let value = 0;
const unsubscribe = progress.subscribe((val) => {
  console.log('ProgressBar value updated to:', val);
  value = val;
});

onDestroy(() => {
  unsubscribe();
});
</script>

<progress class="progress progress-primary w-full" value={value} max="100"
></progress>

<style>
/* Add any custom styles if needed */
</style>
