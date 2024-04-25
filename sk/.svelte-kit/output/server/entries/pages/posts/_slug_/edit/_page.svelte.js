import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/index2.js";
import "marked";
import { L as LoginGuard } from "../../../../../chunks/LoginGuard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slug;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  console.log("Received slug:", slug);
  slug = $page.params.slug;
  $$unsubscribe_page();
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `<main class="container mx-auto my-12 px-4 sm:px-6 lg:px-8">${`<p data-svelte-h="svelte-1koprb0">Loading post...</p>`}</main>`;
    }
  })}`;
});
export {
  Page as default
};
