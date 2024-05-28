import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.2d524d6c.js","_app/immutable/chunks/Alerts.3d0f1509.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.23ea4071.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.74ef3276.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/stores.a912c413.js","_app/immutable/chunks/LoginForm.a6829b9b.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = ["_app/immutable/assets/0.407d49e5.css"];
export const fonts = [];
