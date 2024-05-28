import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, b as each, a as add_attribute, f as createEventDispatcher, v as validate_component } from "../../../chunks/ssr.js";
import { c as client, a as authModel } from "../../../chunks/index2.js";
import "../../../chunks/Alerts.js";
import { a as availableServices, S as ServiceSelector } from "../../../chunks/ServiceSelector.js";
import "marked";
/* empty css                                                      */import { L as LoginGuard } from "../../../chunks/LoginGuard.js";
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
    return `<img${add_attribute("src", pic, 0)} alt="Image" class="h-auto w-full">`;
  })} </div>`;
});
function updateProgressBar(step) {
  const progressElement = document.querySelector(".progress");
  if (progressElement) {
    progressElement.value = step;
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chatGptPrompt;
  let $$unsubscribe_authModel;
  $$unsubscribe_authModel = subscribe(authModel, (value) => value);
  createEventDispatcher();
  let selectedService = availableServices[0]?.name;
  let selectedModel = availableServices[0]?.models?.[0];
  let currentStep = 0;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    chatGptPrompt = "";
    {
      {
        updateProgressBar(currentStep);
      }
    }
    $$rendered = `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
      default: () => {
        return `<div>${`${`<main class="container mx-auto my-12 px-4 sm:px-6 lg:px-8"><form class="bg-base-200 space-y-6 rounded-lg p-6 shadow">${validate_component(ServiceSelector, "ServiceSelector").$$render(
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
        )} <input type="text" class="input input-bordered bg-base-100 w-full" placeholder="Enter thoughts here"${add_attribute("value", chatGptPrompt, 0)}> <div class="text-right" data-svelte-h="svelte-dyxuw0"><button type="submit" class="btn btn-primary">Generate</button></div> <div class="border-accent border border-4">${validate_component(ImageWall, "ImageWall").$$render($$result, {}, {}, {})}</div></form></main>`}`}</div>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_authModel();
  return $$rendered;
});
export {
  Page as default
};
