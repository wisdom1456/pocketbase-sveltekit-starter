import { s as subscribe, a as set_store_value } from "../../chunks/utils.js";
import { c as create_ssr_component, o as onDestroy, a as add_attribute, e as escape, v as validate_component, b as each, d as add_classes } from "../../chunks/ssr.js";
import PocketBase from "pocketbase";
import { m as metadata } from "../../chunks/metadataStore.js";
import { a as authModel, c as client, b as beforeNavigate } from "../../chunks/index2.js";
import { A as Alerts } from "../../chunks/Alerts.js";
import { b as base } from "../../chunks/paths.js";
import { p as page } from "../../chunks/stores.js";
import { L as LoginForm } from "../../chunks/LoginForm.js";
const site = {
  name: "mind",
  source_url: "https://modible.com/mind",
  description: "Capture your inspiration and ideas with mind. A simple and elegant journaling app that helps you stay organized."
};
const app = "";
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { open } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  return `<dialog class="modal" ${open ? "open" : ""}><div class="modal-box">${slots.default ? slots.default({}) : ``} <div class="modal-action"><button class="btn btn-primary" data-svelte-h="svelte-9f8voo">Close</button></div></div> </dialog>`;
});
const LoginBadge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authModel, $$unsubscribe_authModel;
  $$unsubscribe_authModel = subscribe(authModel, (value) => $authModel = value);
  let isDialogOpen = false;
  let isDropdownOpen = false;
  const unsubscribe = client.authStore.onChange(
    (token, model) => {
    },
    false
  );
  onDestroy(() => {
    unsubscribe();
  });
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = ` ${$authModel ? `<div class="relative inline-block text-left"><button class="dropdown" aria-haspopup="true"${add_attribute("aria-expanded", isDropdownOpen, 0)}><div tabindex="0" role="button" class="btn">${escape($authModel?.name || $authModel?.username || "User")}</div></button> ${``}</div>` : `<button class="btn btn-primary" data-svelte-h="svelte-j0oxai">Sign In</button>`} ${validate_component(Dialog, "Dialog").$$render(
      $$result,
      { open: isDialogOpen },
      {
        open: ($$value) => {
          isDialogOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${$authModel ? ` <div><button data-svelte-h="svelte-11z22cn">Sign Out</button></div>` : ` <div>${validate_component(LoginForm, "LoginForm").$$render($$result, {}, {}, {})}</div>`}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_authModel();
  return $$rendered;
});
const themes = [
  {
    id: "light",
    name: "Light",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    primaryColor: "#f0f0f0",
    secondaryColor: "#e0e0e0",
    accentColor: "#d0d0d0"
  },
  {
    id: "dark",
    name: "Dark",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    primaryColor: "#111111",
    secondaryColor: "#222222",
    accentColor: "#333333"
  },
  {
    id: "cupcake",
    name: "Cupcake",
    backgroundColor: "#f8e5e5",
    textColor: "#8b5e34",
    primaryColor: "#f4c7c7",
    secondaryColor: "#e6b8b8",
    accentColor: "#d9a3a3"
  },
  {
    id: "bumblebee",
    name: "Bumblebee",
    backgroundColor: "#fef3c7",
    textColor: "#78350f",
    primaryColor: "#fde68a",
    secondaryColor: "#fcd34d",
    accentColor: "#fbbf24"
  },
  {
    id: "emerald",
    name: "Emerald",
    backgroundColor: "#ecfdf5",
    textColor: "#064e3b",
    primaryColor: "#d1fae5",
    secondaryColor: "#a7f3d0",
    accentColor: "#6ee7b7"
  },
  {
    id: "corporate",
    name: "Corporate",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    primaryColor: "#e5e7eb",
    secondaryColor: "#d1d5db",
    accentColor: "#9ca3af"
  },
  {
    id: "synthwave",
    name: "Synthwave",
    backgroundColor: "#2b213a",
    textColor: "#e2e2e2",
    primaryColor: "#302b63",
    secondaryColor: "#4a00e0",
    accentColor: "#8e2de2"
  },
  {
    id: "retro",
    name: "Retro",
    backgroundColor: "#fffbeb",
    textColor: "#3f2a22",
    primaryColor: "#fde68a",
    secondaryColor: "#fcd34d",
    accentColor: "#fbbf24"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    backgroundColor: "#0f0f0f",
    textColor: "#f1f1f1",
    primaryColor: "#ff7a18",
    secondaryColor: "#fe640b",
    accentColor: "#fd7e14"
  },
  {
    id: "valentine",
    name: "Valentine",
    backgroundColor: "#fce7f3",
    textColor: "#831843",
    primaryColor: "#fbcfe8",
    secondaryColor: "#f9a8d4",
    accentColor: "#f472b6"
  },
  {
    id: "halloween",
    name: "Halloween",
    backgroundColor: "#0f172a",
    textColor: "#f8fafc",
    primaryColor: "#1e293b",
    secondaryColor: "#334155",
    accentColor: "#4b5563"
  },
  {
    id: "garden",
    name: "Garden",
    backgroundColor: "#ecfccb",
    textColor: "#365314",
    primaryColor: "#d9f99d",
    secondaryColor: "#bef264",
    accentColor: "#a3e635"
  },
  {
    id: "forest",
    name: "Forest",
    backgroundColor: "#1a202c",
    textColor: "#f5f5f4",
    primaryColor: "#2d3748",
    secondaryColor: "#4a5568",
    accentColor: "#718096"
  },
  {
    id: "aqua",
    name: "Aqua",
    backgroundColor: "#e6fffa",
    textColor: "#0d5553",
    primaryColor: "#b2f5ea",
    secondaryColor: "#81e6d9",
    accentColor: "#4fd1c5"
  },
  {
    id: "lofi",
    name: "Lo-Fi",
    backgroundColor: "#f9fafb",
    textColor: "#1f2937",
    primaryColor: "#e5e7eb",
    secondaryColor: "#d1d5db",
    accentColor: "#9ca3af"
  },
  {
    id: "pastel",
    name: "Pastel",
    backgroundColor: "#fdf2f8",
    textColor: "#701a75",
    primaryColor: "#f5d0fe",
    secondaryColor: "#f0abfc",
    accentColor: "#e879f9"
  },
  {
    id: "fantasy",
    name: "Fantasy",
    backgroundColor: "#f0fdfa",
    textColor: "#075985",
    primaryColor: "#ccfbf1",
    secondaryColor: "#99f6e4",
    accentColor: "#5eead4"
  },
  {
    id: "wireframe",
    name: "Wireframe",
    backgroundColor: "#f8f8f8",
    textColor: "#333333",
    primaryColor: "#e2e2e2",
    secondaryColor: "#cccccc",
    accentColor: "#b3b3b3"
  },
  {
    id: "black",
    name: "Black",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    primaryColor: "#111111",
    secondaryColor: "#222222",
    accentColor: "#333333"
  },
  {
    id: "luxury",
    name: "Luxury",
    backgroundColor: "#1a1a1a",
    textColor: "#fafafa",
    primaryColor: "#2e2e2e",
    secondaryColor: "#3b3b3b",
    accentColor: "#525252"
  },
  {
    id: "dracula",
    name: "Dracula",
    backgroundColor: "#282a36",
    textColor: "#f8f8f2",
    primaryColor: "#44475a",
    secondaryColor: "#6272a4",
    accentColor: "#bd93f9"
  },
  {
    id: "cmyk",
    name: "CMYK",
    backgroundColor: "#0f172a",
    textColor: "#f1f5f9",
    primaryColor: "#1e293b",
    secondaryColor: "#334155",
    accentColor: "#4b5563"
  },
  {
    id: "autumn",
    name: "Autumn",
    backgroundColor: "#fef2f2",
    textColor: "#7f1d1d",
    primaryColor: "#fecaca",
    secondaryColor: "#fca5a5",
    accentColor: "#f87171"
  },
  {
    id: "business",
    name: "Business",
    backgroundColor: "#1e293b",
    textColor: "#f1f5f9",
    primaryColor: "#334155",
    secondaryColor: "#475569",
    accentColor: "#64748b"
  },
  {
    id: "acid",
    name: "Acid",
    backgroundColor: "#f0fdf4",
    textColor: "#166534",
    primaryColor: "#dcfce7",
    secondaryColor: "#bbf7d0",
    accentColor: "#86efac"
  },
  {
    id: "lemonade",
    name: "Lemonade",
    backgroundColor: "#fff7ed",
    textColor: "#7c2d12",
    primaryColor: "#ffedd5",
    secondaryColor: "#fed7aa",
    accentColor: "#fdba74"
  },
  {
    id: "night",
    name: "Night",
    backgroundColor: "#0f172a",
    textColor: "#f1f5f9",
    primaryColor: "#1e293b",
    secondaryColor: "#334155",
    accentColor: "#4b5563"
  },
  {
    id: "coffee",
    name: "Coffee",
    backgroundColor: "#1c1917",
    textColor: "#fafaf9",
    primaryColor: "#292524",
    secondaryColor: "#3f3f46",
    accentColor: "#52525b"
  },
  {
    id: "winter",
    name: "Winter",
    backgroundColor: "#f8fafc",
    textColor: "#0f172a",
    primaryColor: "#e2e8f0",
    secondaryColor: "#cbd5e1",
    accentColor: "#94a3b8"
  },
  {
    id: "dim",
    name: "Dim",
    backgroundColor: "#1a1c1e",
    textColor: "#e4e4e7",
    primaryColor: "#2b2b2b",
    secondaryColor: "#3f3f46",
    accentColor: "#52525b"
  },
  {
    id: "nord",
    name: "Nord",
    backgroundColor: "#f8fafc",
    textColor: "#0f172a",
    primaryColor: "#e2e8f0",
    secondaryColor: "#cbd5e1",
    accentColor: "#94a3b8"
  },
  {
    id: "sunset",
    name: "Sunset",
    backgroundColor: "#f8f5e4",
    textColor: "#1c1917",
    primaryColor: "#fed7aa",
    secondaryColor: "#fed7aa",
    accentColor: "#fdba74"
  }
];
const ThemeSwitch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modal;
  return `<button type="button" aria-label="Open Theme Modal" data-svelte-h="svelte-1tvms4d">Theme</button> <dialog class="modal" id="modal"${add_attribute("this", modal, 0)}><div class="modal-box w-11/12 max-w-5xl"><h3 class="text-lg font-bold" data-svelte-h="svelte-k7rklh">Select a Theme</h3> <div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">${each(themes, (theme) => {
    return `<button class="cursor-pointer overflow-hidden rounded-lg border border-base-content/20 outline outline-2 outline-offset-2 outline-transparent hover:border-base-content/40"${add_attribute("data-set-theme", theme.id, 0)} data-act-class="!outline-base-content"><div${add_attribute("data-theme", theme.id, 0)} class="w-full bg-base-100 font-sans text-base-content"><div class="grid grid-cols-5 grid-rows-3"><div class="col-start-1 row-span-2 row-start-1 bg-base-200"></div> <div class="col-start-1 row-start-3 bg-base-300"></div> <div class="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 bg-base-100 p-2"><div class="font-bold">${escape(theme.name)}</div> <div class="flex flex-wrap gap-1" data-svelte-h="svelte-qkhqyc"><div class="flex aspect-square w-5 items-center justify-center rounded bg-primary lg:w-6"><div class="text-sm font-bold text-primary-content">A</div></div> <div class="flex aspect-square w-5 items-center justify-center rounded bg-secondary lg:w-6"><div class="text-sm font-bold text-secondary-content">A
                    </div></div> <div class="flex aspect-square w-5 items-center justify-center rounded bg-accent lg:w-6"><div class="text-sm font-bold text-accent-content">A</div></div> <div class="flex aspect-square w-5 items-center justify-center rounded bg-neutral lg:w-6"><div class="text-sm font-bold text-neutral-content">A</div></div> </div></div> </div></div> </button>`;
  })}</div></div> <form method="dialog" class="modal-backdrop" data-svelte-h="svelte-nzabrk"><button>Close</button></form></dialog>`;
});
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authModel, $$unsubscribe_authModel;
  let $page, $$unsubscribe_page;
  $$unsubscribe_authModel = subscribe(authModel, (value) => $authModel = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isOpen = false;
  const appLinks = [
    ["/create/", "Create"],
    ["/remember/", "Remember"],
    //,
    ["/inspire/", "Inspire"]
  ];
  const landingLinks = [
    ["/#features", "Features"],
    ["/#how-it-works", "How It Works"],
    ["/#pricing", "Pricing"],
    ["/#testimonials", "Testimonials"],
    ["/#contact", "Contact"]
  ];
  $$unsubscribe_authModel();
  $$unsubscribe_page();
  return `<nav><div class="navbar"><div class="navbar-start"><div class="dropdown" role="button" aria-haspopup="true"${add_attribute("aria-expanded", isOpen, 0)}${add_attribute("tabindex", 0, 0)}><button class="btn btn-ghost lg:hidden" tabindex="0" data-svelte-h="svelte-hulv4i"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg></button> ${``}</div> <a href="/" class="btn btn-ghost text-xl normal-case" data-svelte-h="svelte-843whk">mind.ai</a></div> <div class="navbar-center hidden lg:flex"><ul class="menu menu-horizontal p-0">${$authModel ? `${each(appLinks, ([path, label]) => {
    return `<li class="p-4"><a${add_attribute("href", `${base}${path}`, 0)}${add_classes(($page.url.pathname === path ? "active" : "").trim())}>${escape(label)}</a> </li>`;
  })} <li class="p-4">${validate_component(ThemeSwitch, "ThemeSwitch").$$render($$result, {}, {}, {})}</li>` : `${each(landingLinks, ([path, label]) => {
    return `<li class="p-4"><a${add_attribute("href", path, 0)}>${escape(label)}</a></li>`;
  })}`}</ul></div> <div class="navbar-end">${validate_component(LoginBadge, "LoginBadge").$$render($$result, {}, {}, {})}</div></div></nav>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <footer class="footer footer-center bg-base-300 py-8 text-base-content" data-svelte-h="svelte-hxa3zz"><div><p class="font-bold">mind.ai</p> <p>Cultivating Brilliant Ideas Since 2009</p> <p>modible - 2024 - All right reserved</p></div> <div><div class="grid grid-flow-col gap-4"><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> <a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> <a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a></div></div></footer>`;
});
new PocketBase(`$("http://localhost:8090/")`);
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let description;
  let $metadata, $$unsubscribe_metadata;
  $$unsubscribe_metadata = subscribe(metadata, (value) => $metadata = value);
  beforeNavigate(() => {
    set_store_value(metadata, $metadata = {}, $metadata);
  });
  title = $metadata.title ? $metadata.title + " | " + site.name : site.name;
  description = $metadata.description ?? site.description;
  $metadata.headline ?? $metadata.title;
  $$unsubscribe_metadata();
  return `${$$result.head += `<!-- HEAD_svelte-1law5hj_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="description"${add_attribute("content", description, 0)}><!-- HEAD_svelte-1law5hj_END -->`, ""} <div class="flex h-screen min-h-screen flex-col"><header>${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</header> <main class="flex-grow"><div class="pt-4"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="mx-auto max-w-2xl text-center">${validate_component(Alerts, "Alerts").$$render($$result, {}, {}, {})}</div> ${slots.default ? slots.default({}) : ``}</div></div></main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
