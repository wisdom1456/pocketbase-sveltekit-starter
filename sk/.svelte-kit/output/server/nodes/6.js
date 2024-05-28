import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.db279b6e.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/LoginGuard.4ed2dc58.js","_app/immutable/chunks/index.23ea4071.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.74ef3276.js","_app/immutable/chunks/LoginForm.a6829b9b.js"];
export const stylesheets = [];
export const fonts = [];
