import * as universal from '../entries/pages/hello/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hello/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/hello/+page.ts";
export const imports = ["_app/immutable/nodes/6.476e3767.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/LoginGuard.abce3f07.js","_app/immutable/chunks/index.767f9621.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.c4c55af0.js","_app/immutable/chunks/LoginForm.89020df2.js"];
export const stylesheets = [];
export const fonts = [];
