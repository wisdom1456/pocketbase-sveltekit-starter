import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.c8ad175c.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/LoginGuard.0c85c1d4.js","_app/immutable/chunks/index.f48a89bf.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.d30dba1f.js","_app/immutable/chunks/LoginForm.c9792562.js"];
export const stylesheets = [];
export const fonts = [];
