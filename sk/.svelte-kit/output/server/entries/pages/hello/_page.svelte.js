import { c as create_ssr_component, v as validate_component, b as escape } from "../../../chunks/ssr.js";
import { L as LoginGuard } from "../../../chunks/LoginGuard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(LoginGuard, "LoginGuard").$$render($$result, {}, {}, {
    default: () => {
      return `<h1 data-svelte-h="svelte-gbi83v">Hello!</h1> <p data-svelte-h="svelte-cn3rqt">Got the following API response from the backend server</p> <pre>${escape(JSON.stringify(data))}</pre>`;
    }
  })}`;
});
export {
  Page as default
};
