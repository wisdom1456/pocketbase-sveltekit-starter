import { c as create_ssr_component, f as createEventDispatcher, b as each, a as add_attribute, e as escape } from "./ssr.js";
import "./index2.js";
const availableServices = [
  {
    name: "Anthropic",
    models: [
      "claude-3-haiku-20240307",
      "claude-3-sonnet-20240229",
      "claude-3-opus-20240229",
      "claude-2.1",
      "claude-2.0",
      "claude-instant-1.2"
    ]
  },
  {
    name: "OpenAI",
    models: ["gpt-4-turbo-preview", "gpt-3.5-turbo"]
  }
];
const ServiceSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedService = availableServices[0]?.name ?? "" } = $$props;
  let { selectedModel = availableServices[0]?.models[0] ?? "" } = $$props;
  createEventDispatcher();
  if ($$props.selectedService === void 0 && $$bindings.selectedService && selectedService !== void 0)
    $$bindings.selectedService(selectedService);
  if ($$props.selectedModel === void 0 && $$bindings.selectedModel && selectedModel !== void 0)
    $$bindings.selectedModel(selectedModel);
  return `<div class="flex bg-primary items-center text-primary-content"><select class="select select-ghost w-full max-w-xs">${each(availableServices, (service) => {
    return `<option${add_attribute("value", service.name, 0)}>${escape(service.name)}</option>`;
  })}</select> ${selectedService ? `<select class="select select-ghost w-full max-w-xs">${each(availableServices.find((s) => s.name === selectedService)?.models ?? [], (model) => {
    return `<option${add_attribute("value", model, 0)}>${escape(model)}</option>`;
  })}</select>` : ``}</div>`;
});
export {
  ServiceSelector as S,
  availableServices as a
};
