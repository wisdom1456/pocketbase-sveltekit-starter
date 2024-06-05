import { c as create_ssr_component, e as each, d as escape } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<table><thead data-svelte-h="svelte-1q8g7kt"><th>when</th> <th>what</th> <th>who</th></thead> <tbody>${data.logs.length ? each(data.logs, (item) => {
    return `<tr><td>${escape(item.updated)}</td> <td>${escape(item.event)}</td> <td>${escape(item.admin || (Array.isArray(item.expand.user) ? item.expand.user[0]?.name : item.expand.user?.name) || item.user)}</td></tr> <tr data-svelte-h="svelte-cta9k3"> </tr>`;
  }) : `<tr data-svelte-h="svelte-14ryxbm"><td colspan="3">No records found.</td> </tr>`}</tbody></table>`;
});
export {
  Page as default
};
