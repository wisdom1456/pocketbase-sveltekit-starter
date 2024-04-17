import * as universal from '../entries/pages/posts/_page.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/posts/+page.ts";
export const imports = ["_app/immutable/nodes/8.66fe0876.js","_app/immutable/chunks/scheduler.edb94b3b.js","_app/immutable/chunks/LoginForm.9ae425e7.js","_app/immutable/chunks/index.ab6f206b.js","_app/immutable/chunks/index.3c75d8e0.js","_app/immutable/chunks/singletons.7ecd36fa.js","_app/immutable/chunks/stores.06d816ae.js","_app/immutable/chunks/public.d750e624.js","_app/immutable/chunks/Alerts.057b49a9.js","_app/immutable/chunks/SvelteMarkdown.98296c2c.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/postService.05f00e28.js","_app/immutable/chunks/LoginGuard.b5c537ab.js"];
export const stylesheets = [];
export const fonts = [];
