import * as universal from '../entries/pages/posts/_slug_/edit/_page.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/edit/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/posts/[slug]/edit/+page.ts";
export const imports = ["_app/immutable/nodes/10.a44e4190.js","_app/immutable/chunks/index.767f9621.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.c4c55af0.js","_app/immutable/chunks/stores.6435673e.js","_app/immutable/chunks/postService.30f0bacc.js","_app/immutable/chunks/Alerts.245a24b3.js","_app/immutable/chunks/SvelteMarkdown.1ce2d97d.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/api.a4c1ba98.js","_app/immutable/chunks/LoginGuard.abce3f07.js","_app/immutable/chunks/LoginForm.89020df2.js"];
export const stylesheets = [];
export const fonts = [];
