import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.0ab8dba0.js","_app/immutable/chunks/Alerts.644dc04d.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.f48a89bf.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.d30dba1f.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/stores.52db70c1.js","_app/immutable/chunks/LoginForm.c9792562.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = ["_app/immutable/assets/0.01656e9a.css"];
export const fonts = [];
