import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/index.js";
import "marked";
/* empty css                                                         */import "../../../../chunks/Alerts.js";
import { L as LoginGuard } from "../../../../chunks/LoginGuard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="container mx-auto px-4">${`<p data-svelte-h="svelte-1deh4cj">Tag not found.</p>`}</div>`;
    }
  })}`;
});
export {
  Page as default
};
