<script>
import { onMount } from "svelte";
import { themes } from "$lib/utils/themes";

let currentTheme = "light";
/**
 * @type {HTMLDialogElement}
 */
let modal;

/**
 * @param {string} themeId
 */
function changeTheme(themeId) {
  const theme = themes.find((t) => t.id === themeId);
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme.id);
    currentTheme = theme.id;
    localStorage.setItem("theme", theme.id);
    modal.close();
  }
}

onMount(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && themes.some((t) => t.id === savedTheme)) {
    changeTheme(savedTheme);
  }
});
</script>

<button
  type="button"
  on:click={() => modal.showModal()}
  aria-label="Open Theme Modal">Theme</button
>

<dialog bind:this={modal} class="modal" id="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="text-lg font-bold">Select a Theme</h3>
    <div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
      {#each themes as theme (theme.id)}
        <button
          class="cursor-pointer overflow-hidden rounded-lg border border-base-content/20 outline outline-2 outline-offset-2 outline-transparent hover:border-base-content/40"
          data-set-theme={theme.id}
          data-act-class="!outline-base-content"
          on:click={() => changeTheme(theme.id)}
        >
          <div
            data-theme={theme.id}
            class="w-full bg-base-100 font-sans text-base-content"
          >
            <div class="grid grid-cols-5 grid-rows-3">
              <div class="col-start-1 row-span-2 row-start-1 bg-base-200"></div>
              <div class="col-start-1 row-start-3 bg-base-300"></div>
              <div
                class="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 bg-base-100 p-2"
              >
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
                    <div class="text-sm font-bold text-secondary-content">
                      A
                    </div>
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
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>
