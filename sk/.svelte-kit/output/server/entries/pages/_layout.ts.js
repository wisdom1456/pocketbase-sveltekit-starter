import { a as alerts } from "../../chunks/Alerts.js";
const ssr = false;
const prerender = false;
const trailingSlash = "always";
const load = async ({ fetch }) => {
  const response = await fetch("/_/");
  if (response.redirected) {
    alerts.add({
      message: 'Please visit <a href="/_/">/_ </a> to finalize installation of PocketBase',
      type: "error",
      html: true
    });
  }
  return {};
};
export {
  load,
  prerender,
  ssr,
  trailingSlash
};
