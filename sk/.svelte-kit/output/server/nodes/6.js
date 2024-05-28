import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.da1704f7.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/LoginGuard.1e22effa.js","_app/immutable/chunks/index.cad83b43.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.c906e4e7.js","_app/immutable/chunks/LoginForm.38f03719.js"];
export const stylesheets = [];
export const fonts = [];
