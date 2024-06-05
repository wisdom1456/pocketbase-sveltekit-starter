import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, e as each, b as add_attribute, o as onDestroy, a as createEventDispatcher, v as validate_component } from "../../../chunks/ssr.js";
import { c as client, a as authModel } from "../../../chunks/index2.js";
import "../../../chunks/Alerts.js";
import { a as availableServices, S as ServiceSelector } from "../../../chunks/ServiceSelector.js";
import "marked";
import { L as LoginGuard } from "../../../chunks/LoginGuard.js";
import { w as writable } from "../../../chunks/index.js";
const progress = writable(0);
const InterpretationList_svelte_svelte_type_style_lang = "";
const ImageWall = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images = [];
  let imageWallList = [];
  function updateImageWallList(images2) {
    imageWallList = images2.filter((image) => image.file).map((image) => client.files.getUrl(image, image.file));
  }
  {
    updateImageWallList(images);
  }
  return `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">${each(imageWallList, (pic) => {
    return `<img${add_attribute("src", pic, 0)} alt="Wall of images" class="h-auto w-full">`;
  })} </div>`;
});
const ProgressBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value = 0;
  const unsubscribe = progress.subscribe((val) => {
    console.log("ProgressBar value updated to:", val);
    value = val;
  });
  onDestroy(() => {
    unsubscribe();
  });
  return `  <progress class="progress progress-primary w-full"${add_attribute("value", value, 0)} max="100"></progress>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authModel;
  $$unsubscribe_authModel = subscribe(authModel, (value) => value);
  createEventDispatcher();
  let selectedService = availableServices[0]?.name;
  let selectedModel = availableServices[0]?.models?.[0];
  let chatGptPrompt = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
      default: () => {
        return `<div>${`${`<main class="container mx-auto my-12 px-4 sm:px-6 lg:px-8"><form class="space-y-6 rounded-lg bg-base-200 p-6 shadow">${validate_component(ServiceSelector, "ServiceSelector").$$render(
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
        )} <input type="text" class="input input-bordered w-full bg-base-100" placeholder="Enter thoughts here"${add_attribute("value", chatGptPrompt, 0)}> <div class="text-right" data-svelte-h="svelte-dyxuw0"><button type="submit" class="btn btn-primary">Generate</button></div> ${validate_component(ProgressBar, "ProgressBar").$$render($$result, {}, {}, {})} <div class="border-4 border-accent">${validate_component(ImageWall, "ImageWall").$$render($$result, {}, {}, {})}</div></form></main>`}`}</div>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_authModel();
  return $$rendered;
});
export {
  Page as default
};
