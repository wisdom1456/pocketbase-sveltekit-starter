import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.b969d681.js","_app/immutable/chunks/Alerts.0be9a70c.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.cad83b43.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.c906e4e7.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/stores.f104b4d1.js","_app/immutable/chunks/LoginForm.38f03719.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = ["_app/immutable/assets/0.407d49e5.css"];
export const fonts = [];
