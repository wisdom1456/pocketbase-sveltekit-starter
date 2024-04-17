import { i as is_promise, n as noop } from "./utils.js";
import { c as create_ssr_component, e as escape, a as each, b as add_attribute } from "./ssr.js";
import { c as client } from "./index.js";
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { authCollection = "users" } = $$props;
  let { passwordLogin = true } = $$props;
  let { signup = true } = $$props;
  const coll = client.collection(authCollection);
  let email;
  let name;
  let password;
  let passwordConfirm;
  let admin = false;
  let activeTab = signup ? "SignUp" : "SignIn";
  if ($$props.authCollection === void 0 && $$bindings.authCollection && authCollection !== void 0)
    $$bindings.authCollection(authCollection);
  if ($$props.passwordLogin === void 0 && $$bindings.passwordLogin && passwordLogin !== void 0)
    $$bindings.passwordLogin(passwordLogin);
  if ($$props.signup === void 0 && $$bindings.signup && signup !== void 0)
    $$bindings.signup(signup);
  return `<form class="rounded-box bg-base-200 flex max-w-md flex-col gap-4 p-6">${passwordLogin ? `<h1 class="self-center text-3xl font-bold">${escape(activeTab === "SignIn" ? "Log in" : "Create an account")}</h1> <div class="tabs self-center"><button class="${"tab tab-bordered " + escape(activeTab === "SignIn" ? "tab-active" : "", true)}" aria-label="Log in" type="button">Log in</button> <button class="${"tab tab-bordered " + escape(activeTab === "SignUp" ? "tab-active" : "", true)}" aria-label="Sign up">Sign up</button></div> ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(methods) {
      return ` <div class="space-y-2">${each(methods.authProviders, (p) => {
        return `<button class="btn btn-neutral w-full" type="button"><i class="fa-brands fa-google text-primary mr-2"></i> ${escape(activeTab === "SignIn" ? "Log in" : "Sign up")} with ${escape(p.name)} </button>`;
      })}</div> `;
    }(__value);
  }(coll.listAuthMethods({ $autoCancel: false }))} <div class="divider" data-svelte-h="svelte-cr75gt">OR</div> ${activeTab === "SignIn" ? `<label class="form-control"><div class="label" data-svelte-h="svelte-z82hsd"><span class="label-text">Email</span></div> <input class="input input-bordered" required type="email" placeholder="email" id="email-input" autocomplete="email"${add_attribute("value", email, 0)}></label> <label class="form-control"><div class="label" data-svelte-h="svelte-vwtoqm"><span class="label-text">Password</span></div> <input class="input input-bordered" required type="password" placeholder="password" id="password-input" autocomplete="current-password"${add_attribute("value", password, 0)}></label> <div class="form-control"><label class="label cursor-pointer gap-2 self-start"><input type="checkbox" class="checkbox"${add_attribute("checked", admin, 1)}> <span class="label-text" data-svelte-h="svelte-zhyesw">Admin</span></label></div> <button class="btn btn-primary" type="submit" data-svelte-h="svelte-1ecug65">Log in</button>` : `${activeTab === "SignUp" ? `<label class="form-control"><div class="label" data-svelte-h="svelte-z82hsd"><span class="label-text">Email</span></div> <input class="input input-bordered" required type="text" placeholder="email"${add_attribute("value", email, 0)}></label> <label class="form-control"><div class="label" data-svelte-h="svelte-vwtoqm"><span class="label-text">Password</span></div> <input class="input input-bordered" required type="password" placeholder="password"${add_attribute("value", password, 0)}></label> <label class="form-control"><div class="label" data-svelte-h="svelte-1dsbuwe"><span class="label-text">Confirm password</span></div> <input class="input input-bordered" required type="password" placeholder="confirm password"${add_attribute("value", passwordConfirm, 0)}></label> <label class="form-control"><div class="label" data-svelte-h="svelte-rcylod"><span class="label-text">Name / Label</span></div> <input class="input input-bordered" required type="text" placeholder="name / label"${add_attribute("value", name, 0)}></label> <input type="hidden" name="register"${add_attribute("value", true, 0)}> <button class="btn btn-primary" type="submit" data-svelte-h="svelte-1dauk6r">Sign up</button>` : ``}`} ${``} ${``}` : ``}</form>`;
});
export {
  LoginForm as L
};
