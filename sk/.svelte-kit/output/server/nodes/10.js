import * as universal from '../entries/pages/posts/_slug_/edit/_page.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/edit/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/posts/[slug]/edit/+page.ts";
export const imports = ["_app/immutable/nodes/10.01c3b303.js","_app/immutable/chunks/index.fbc63c43.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.322b0c73.js","_app/immutable/chunks/stores.6461a36b.js","_app/immutable/chunks/postService.3605a54c.js","_app/immutable/chunks/Alerts.acde20e5.js","_app/immutable/chunks/SvelteMarkdown.bf6db5b9.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/api.72923003.js","_app/immutable/chunks/LoginGuard.658c6d72.js","_app/immutable/chunks/LoginForm.b0b1e4a3.js"];
export const stylesheets = [];
export const fonts = [];
