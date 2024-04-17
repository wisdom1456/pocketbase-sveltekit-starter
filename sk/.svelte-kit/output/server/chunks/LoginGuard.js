import { s as subscribe, c as compute_slots } from "./utils.js";
import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { a as authModel, g as goto } from "./index.js";
import { Admin } from "pocketbase";
import { L as LoginForm } from "./LoginForm.js";
const LoginGuard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let authorized;
  let $$slots = compute_slots(slots);
  let $authModel, $$unsubscribe_authModel;
  $$unsubscribe_authModel = subscribe(authModel, (value) => $authModel = value);
  let { admin = void 0 } = $$props;
  let { slotLogin = false } = $$props;
  let { destination = null } = $$props;
  if ($$props.admin === void 0 && $$bindings.admin && admin !== void 0)
    $$bindings.admin(admin);
  if ($$props.slotLogin === void 0 && $$bindings.slotLogin && slotLogin !== void 0)
    $$bindings.slotLogin(slotLogin);
  if ($$props.destination === void 0 && $$bindings.destination && destination !== void 0)
    $$bindings.destination(destination);
  {
    if (destination != null && $authModel) {
      goto(destination);
    }
  }
  authorized = $authModel && //  must be logged in
  (admin === void 0 || // admin or not, doesn't matter
  admin === true && $authModel instanceof Admin || // must be admin
  admin === false && !($authModel instanceof Admin));
  $$unsubscribe_authModel();
  return `${authorized ? `${slots.default ? slots.default({}) : ``}` : `${slotLogin || $$slots["login"] ? `${slots.login ? slots.login({}) : ` ${validate_component(LoginForm, "LoginForm").$$render($$result, {}, {}, {})} `}` : ``}`}`;
});
export {
  LoginGuard as L
};
