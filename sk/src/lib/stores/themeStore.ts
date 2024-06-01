import { writable } from "svelte/store";

export const theme = writable(localStorage.getItem("theme") || "light");

theme.subscribe((value) => {
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
});
