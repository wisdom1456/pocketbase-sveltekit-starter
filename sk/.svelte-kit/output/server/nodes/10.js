import * as universal from '../entries/pages/posts/_slug_/edit/_page.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/edit/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/posts/[slug]/edit/+page.ts";
export const imports = ["_app/immutable/nodes/10.38bed140.js","_app/immutable/chunks/index.6d88ee30.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/singletons.a0b02ded.js","_app/immutable/chunks/stores.a6b8ff96.js","_app/immutable/chunks/postService.00e08d84.js","_app/immutable/chunks/Alerts.9a8447ee.js","_app/immutable/chunks/SvelteMarkdown.ec2fd99c.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/api.e256923c.js","_app/immutable/chunks/LoginGuard.44709ec0.js","_app/immutable/chunks/LoginForm.089523d1.js"];
export const stylesheets = [];
export const fonts = [];
