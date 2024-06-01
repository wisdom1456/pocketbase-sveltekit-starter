import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.905213f2.js","_app/immutable/chunks/scheduler.97adf797.js","_app/immutable/chunks/index.7119c0cc.js","_app/immutable/chunks/LoginGuard.cd1ff462.js","_app/immutable/chunks/index.3953fd75.js","_app/immutable/chunks/index.15707502.js","_app/immutable/chunks/singletons.a77e5c97.js","_app/immutable/chunks/LoginForm.4925c669.js"];
export const stylesheets = [];
export const fonts = [];
