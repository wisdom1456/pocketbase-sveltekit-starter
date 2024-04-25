import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.d6f2c178.js","_app/immutable/chunks/Alerts.f0e47bfd.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.1c988bca.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.d503bb2d.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/stores.aff678ae.js","_app/immutable/chunks/LoginForm.811c8c38.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = ["_app/immutable/assets/0.fe79eeb9.css"];
export const fonts = [];
