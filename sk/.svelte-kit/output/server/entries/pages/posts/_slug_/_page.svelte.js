import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/index.js";
import "marked";
/* empty css                                                         */import { L as LoginGuard } from "../../../../chunks/LoginGuard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $page.params.slug;
  $$unsubscribe_page();
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `${`<p data-svelte-h="svelte-1koprb0">Loading post...</p>`}`;
    }
  })}`;
});
export {
  Page as default
};
