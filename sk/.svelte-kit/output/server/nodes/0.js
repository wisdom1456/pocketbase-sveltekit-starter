import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.5827f2d3.js","_app/immutable/chunks/Alerts.245a24b3.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.767f9621.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.c4c55af0.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/stores.6435673e.js","_app/immutable/chunks/LoginForm.89020df2.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = ["_app/immutable/assets/0.01656e9a.css"];
export const fonts = [];
