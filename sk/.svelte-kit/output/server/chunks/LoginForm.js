import { c as create_ssr_component, b as add_attribute, d as escape } from "./ssr.js";
import "./index2.js";
const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { mode = "signin" } = $$props;
  let email = "";
  let name = "";
  let password = "";
  let passwordConfirm = "";
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  return `<form class="flex max-w-md flex-col gap-4 rounded-box bg-base-200 p-6">${mode === "signup" ? `<h1 class="self-center text-3xl font-bold" data-svelte-h="svelte-1ho2mj3">Create an account</h1>` : `<h1 class="self-center text-3xl font-bold" data-svelte-h="svelte-1kplp4e">Log in</h1>`} <label class="form-control"><span class="label-text" data-svelte-h="svelte-fqi07v">Email</span> <input class="input input-bordered" type="email" required placeholder="Email"${add_attribute("value", email, 0)}></label> ${mode === "signup" ? `<label class="form-control"><span class="label-text" data-svelte-h="svelte-qeedsu">Name</span> <input class="input input-bordered" type="text" required placeholder="Name"${add_attribute("value", name, 0)}></label>` : ``} <label class="form-control"><span class="label-text" data-svelte-h="svelte-1sc887w">Password</span> <input class="input input-bordered" type="password" required placeholder="Password"${add_attribute("value", password, 0)}></label> ${mode === "signup" ? `<label class="form-control"><span class="label-text" data-svelte-h="svelte-1j0fl3s">Confirm Password</span> <input class="input input-bordered" type="password" required placeholder="Confirm Password"${add_attribute("value", passwordConfirm, 0)}></label>` : ``} <button class="btn btn-primary" type="submit">${escape(mode === "signup" ? "Sign Up" : "Log In")}</button> ${``} ${``}</form>`;
});
export {
  LoginForm as L
};
