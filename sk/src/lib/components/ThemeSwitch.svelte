<script>
  import { theme } from "$lib/stores/themeStore";
  import { themes } from "$lib/utils/themes";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  /**
   * @param {string} themeId
   */
  function changeTheme(themeId) {
    theme.set(themeId);
    localStorage.setItem('theme', themeId); // Ensure the theme is stored
    console.log("Theme changed to:", themeId);
    dispatch('themeSelected');
  }

  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      theme.set(savedTheme);
      console.log("Loaded saved theme:", savedTheme);
    }
  });
</script>

<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
  {#each themes as theme (theme.id)}
    <button
      class="cursor-pointer overflow-hidden rounded-lg border border-base-content/20 shadow-md hover:shadow-lg transition-shadow duration-300"
      on:click={() => changeTheme(theme.id)}
    >
      <div
        data-theme={theme.id}
        class="w-full bg-base-100 font-sans text-base-content p-2"
      >
        <div class="grid grid-cols-5 grid-rows-3 gap-2">
          <div class="col-start-1 row-span-2 row-start-1 bg-base-200 rounded"></div>
          <div class="col-start-1 row-start-3 bg-base-300 rounded"></div>
          <div class="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 bg-base-100 p-2 rounded">
            <div class="font-bold">{theme.name}</div>
            <div class="flex flex-wrap gap-1">
              <div
                class="flex aspect-square w-5 items-center justify-center rounded bg-primary lg:w-6"
              >
                <div class="text-sm font-bold text-primary-content">A</div>
              </div>
              <div
                class="flex aspect-square w-5 items-center justify-center rounded bg-secondary lg:w-6"
              >
                <div class="text-sm font-bold text-secondary-content">A</div>
              </div>
              <div
                class="flex aspect-square w-5 items-center justify-center rounded bg-accent lg:w-6"
              >
                <div class="text-sm font-bold text-accent-content">A</div>
              </div>
              <div
                class="flex aspect-square w-5 items-center justify-center rounded bg-neutral lg:w-6"
              >
                <div class="text-sm font-bold text-neutral-content">A</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  {/each}
</div>
