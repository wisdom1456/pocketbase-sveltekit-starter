import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import { s as serviceModelSelectionStore } from "../../../../../chunks/stores2.js";
import "../../../../../chunks/index.js";
import "../../../../../chunks/Alerts.js";
import "marked";
/* empty css                                                            */import { a as availableServices, S as ServiceSelector } from "../../../../../chunks/ServiceSelector.js";
import { L as LoginGuard } from "../../../../../chunks/LoginGuard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $$unsubscribe_serviceModelSelectionStore;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_serviceModelSelectionStore = subscribe(serviceModelSelectionStore, (value) => value);
  let selectedService = availableServices[0].name;
  let selectedModel = availableServices[0].models[0];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $page.params.slug;
    $$rendered = `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
      default: () => {
        return `<main class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto p-4">${validate_component(ServiceSelector, "ServiceSelector").$$render(
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
  $$unsubscribe_serviceModelSelectionStore();
  return $$rendered;
});
export {
  Page as default
};
