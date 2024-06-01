import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.6439a7ca.js","_app/immutable/chunks/Alerts.35b37a9a.js","_app/immutable/chunks/scheduler.97adf797.js","_app/immutable/chunks/index.3953fd75.js","_app/immutable/chunks/index.7119c0cc.js","_app/immutable/chunks/index.15707502.js","_app/immutable/chunks/singletons.a77e5c97.js","_app/immutable/chunks/metadataStore.965519fa.js","_app/immutable/chunks/stores.ec997d15.js","_app/immutable/chunks/LoginForm.4925c669.js","_app/immutable/chunks/index.3cdded0b.js"];
export const stylesheets = ["_app/immutable/assets/0.db56a810.css"];
export const fonts = [];
