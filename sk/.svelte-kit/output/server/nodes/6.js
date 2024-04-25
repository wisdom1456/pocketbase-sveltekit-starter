import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.835c9067.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/LoginGuard.df2525b9.js","_app/immutable/chunks/index.1c988bca.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.d503bb2d.js","_app/immutable/chunks/LoginForm.811c8c38.js"];
export const stylesheets = [];
export const fonts = [];
