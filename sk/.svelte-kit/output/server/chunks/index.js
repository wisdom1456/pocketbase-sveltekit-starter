import PocketBase from "pocketbase";
import { r as readable } from "./index2.js";
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const goto = /* @__PURE__ */ client_method("goto");
const invalidateAll = /* @__PURE__ */ client_method("invalidate_all");
const beforeNavigate = /* @__PURE__ */ client_method("before_navigate");
const client = new PocketBase(
  void 0
);
const authModel = readable(
  null,
  function(set) {
    client.authStore.onChange((token, model) => {
      set(model);
      invalidateAll();
    }, true);
  }
);
export {
  authModel as a,
  beforeNavigate as b,
  client as c,
  goto as g
};
