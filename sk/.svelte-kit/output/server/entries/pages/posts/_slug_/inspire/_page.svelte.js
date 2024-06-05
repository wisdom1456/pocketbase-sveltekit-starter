import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/index2.js";
import "../../../../../chunks/Alerts.js";
import { a as availableServices, S as ServiceSelector } from "../../../../../chunks/ServiceSelector.js";
import "marked";
import { L as LoginGuard } from "../../../../../chunks/LoginGuard.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".bullet-point.svelte-11zpmt5:hover{transform:translateY(-5px);transition:transform 0.3s ease}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let selectedService = availableServices[0].name;
  let selectedModel = availableServices[0].models[0];
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $page.params.slug;
    $$rendered = `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
      default: () => {
        return `<main class="prose prose-sm mx-auto p-4 sm:prose lg:prose-lg xl:prose-xl">${validate_component(ServiceSelector, "ServiceSelector").$$render(
          $$result,
          { selectedService, selectedModel },
          {
            selectedService: ($$value) => {
              selectedService = $$value;
              $$settled = false;
            },
            selectedModel: ($$value) => {
              selectedModel = $$value;
              $$settled = false;
            }
          },
          {}
        )} ${``}</main>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
