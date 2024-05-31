import * as universal from '../entries/pages/posts/_slug_/edit/_page.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/edit/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/posts/[slug]/edit/+page.ts";
export const imports = ["_app/immutable/nodes/10.49961ad8.js","_app/immutable/chunks/index.f48a89bf.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.d30dba1f.js","_app/immutable/chunks/stores.52db70c1.js","_app/immutable/chunks/postService.a4e13fbd.js","_app/immutable/chunks/Alerts.644dc04d.js","_app/immutable/chunks/SvelteMarkdown.f6ef337e.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/api.bedcf7eb.js","_app/immutable/chunks/LoginGuard.0c85c1d4.js","_app/immutable/chunks/LoginForm.c9792562.js"];
export const stylesheets = [];
export const fonts = [];
