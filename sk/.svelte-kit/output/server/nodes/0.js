import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.5ed7206f.js","_app/immutable/chunks/Alerts.e5310c57.js","_app/immutable/chunks/scheduler.e851ad51.js","_app/immutable/chunks/each.e1f3d343.js","_app/immutable/chunks/index.3c0515f8.js","_app/immutable/chunks/index.236bb830.js","_app/immutable/chunks/index.63e3987d.js","_app/immutable/chunks/singletons.82136565.js","_app/immutable/chunks/metadataStore.7111b88d.js","_app/immutable/chunks/LoginForm.3a887bd1.js","_app/immutable/chunks/index.97b93fc8.js"];
export const stylesheets = ["_app/immutable/assets/0.1914658b.css"];
export const fonts = [];
