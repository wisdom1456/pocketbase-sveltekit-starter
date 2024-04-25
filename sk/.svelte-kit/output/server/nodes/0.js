import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.90deafbc.js","_app/immutable/chunks/Alerts.a79d68e3.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.f8848209.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.068c7307.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/stores.09250c1d.js","_app/immutable/chunks/LoginForm.b6d291cc.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = ["_app/immutable/assets/0.0ed06734.css"];
export const fonts = [];
