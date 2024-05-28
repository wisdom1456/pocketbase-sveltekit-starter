

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.a85044bc.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/stores.a6b8ff96.js","_app/immutable/chunks/singletons.a0b02ded.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/postService.00e08d84.js","_app/immutable/chunks/index.6d88ee30.js","_app/immutable/chunks/Alerts.9a8447ee.js","_app/immutable/chunks/SvelteMarkdown.ec2fd99c.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/TagGroup.4cd4530b.js","_app/immutable/chunks/index.60620a8d.js","_app/immutable/chunks/LoginGuard.44709ec0.js","_app/immutable/chunks/LoginForm.089523d1.js"];
export const stylesheets = ["_app/immutable/assets/TagGroup.c55baf5b.css"];
export const fonts = [];
