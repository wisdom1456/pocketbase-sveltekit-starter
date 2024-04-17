import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.94fb185c.js","_app/immutable/chunks/scheduler.edb94b3b.js","_app/immutable/chunks/index.ab6f206b.js","_app/immutable/chunks/LoginGuard.b5c537ab.js","_app/immutable/chunks/index.3c75d8e0.js","_app/immutable/chunks/singletons.7ecd36fa.js","_app/immutable/chunks/LoginForm.9ae425e7.js"];
export const stylesheets = [];
export const fonts = [];
