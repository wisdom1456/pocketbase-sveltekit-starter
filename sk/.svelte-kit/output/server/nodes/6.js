import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.03c2d4ff.js","_app/immutable/chunks/scheduler.e851ad51.js","_app/immutable/chunks/index.3c0515f8.js","_app/immutable/chunks/LoginGuard.b17c3678.js","_app/immutable/chunks/index.63e3987d.js","_app/immutable/chunks/index.236bb830.js","_app/immutable/chunks/singletons.82136565.js","_app/immutable/chunks/LoginForm.3a887bd1.js"];
export const stylesheets = [];
export const fonts = [];
