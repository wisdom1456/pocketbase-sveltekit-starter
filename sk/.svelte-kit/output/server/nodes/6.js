import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.216d41f1.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/LoginGuard.44709ec0.js","_app/immutable/chunks/index.6d88ee30.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.a0b02ded.js","_app/immutable/chunks/LoginForm.089523d1.js"];
export const stylesheets = [];
export const fonts = [];
