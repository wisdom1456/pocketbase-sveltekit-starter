import { s as subscribe } from "./utils.js";
import { c as create_ssr_component, e as each, a as add_attribute, b as escape } from "./ssr.js";
import { w as writable } from "./index.js";
const alerts = {
  ...writable([]),
  add({ message, type = "info", timeout = 0, html = false }) {
    const alert = { message, type, html };
    this.update((v) => [...v, alert]);
    if (timeout) {
      setTimeout(
        () => {
          dismiss(alert);
        },
        timeout
      );
    }
  },
  info(message, timeout = 0) {
    this.add({ message, type: "info", timeout });
  },
  success(message, timeout = 0) {
    this.add({ message, type: "success", timeout });
  },
  warning(message, timeout = 0) {
    this.add({ message, type: "warning", timeout });
  },
  error(message, timeout = 0) {
    this.add({ message, type: "error", timeout });
  }
};
function dismiss(alert) {
  alerts.update((val) => val.filter((a) => a !== alert));
}
const Alerts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $alerts, $$unsubscribe_alerts;
  $$unsubscribe_alerts = subscribe(alerts, (value) => $alerts = value);
  $$unsubscribe_alerts();
  return ` <article>${$alerts.length > 1 ? `<button class="tight" data-svelte-h="svelte-1m0xn5l">Dismiss All</button>` : ``} ${each($alerts, (alert) => {
    return `<blockquote${add_attribute("class", alert.type, 0)}><button class="dismiss" data-svelte-h="svelte-16goicf">×</button> ${alert.html ? `<!-- HTML_TAG_START -->${alert.message}<!-- HTML_TAG_END -->` : `${escape(alert.message)}`} </blockquote>`;
  })} </article>`;
});
export {
  Alerts as A,
  alerts as a
};
