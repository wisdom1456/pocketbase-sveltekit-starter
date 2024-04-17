import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.b7419475.js","_app/immutable/chunks/Alerts.057b49a9.js","_app/immutable/chunks/scheduler.edb94b3b.js","_app/immutable/chunks/index.3c75d8e0.js","_app/immutable/chunks/index.ab6f206b.js","_app/immutable/chunks/singletons.7ecd36fa.js","_app/immutable/chunks/stores.06d816ae.js","_app/immutable/chunks/public.d750e624.js","_app/immutable/chunks/stores.9c1bddb2.js","_app/immutable/chunks/LoginForm.9ae425e7.js","_app/immutable/chunks/index.a680cd08.js"];
export const stylesheets = ["_app/immutable/assets/0.c12ba6e6.css"];
export const fonts = [];
