import { s as subscribe, a as set_store_value } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { m as metadata } from "../../../chunks/stores2.js";
import "../../../chunks/index.js";
import "../../../chunks/Alerts.js";
import "marked";
import { L as LoginGuard } from "../../../chunks/LoginGuard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $metadata, $$unsubscribe_metadata;
  $$unsubscribe_metadata = subscribe(metadata, (value) => $metadata = value);
  set_store_value(metadata, $metadata.title = "reflect", $metadata);
  set_store_value(metadata, $metadata.description = "reflect ai", $metadata);
  $$unsubscribe_metadata();
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `Coming Soon`;
    }
  })}`;
});
export {
  Page as default
};
