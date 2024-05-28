import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.bd098eb3.js","_app/immutable/chunks/Alerts.9a8447ee.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.6d88ee30.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.a0b02ded.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/stores.a6b8ff96.js","_app/immutable/chunks/LoginForm.089523d1.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = ["_app/immutable/assets/0.35c2d909.css"];
export const fonts = [];
