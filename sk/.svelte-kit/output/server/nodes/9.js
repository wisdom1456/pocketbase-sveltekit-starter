

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.f1a876f6.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/stores.6461a36b.js","_app/immutable/chunks/singletons.322b0c73.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/postService.3605a54c.js","_app/immutable/chunks/index.fbc63c43.js","_app/immutable/chunks/Alerts.acde20e5.js","_app/immutable/chunks/SvelteMarkdown.bf6db5b9.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/TagGroup.5c7274d9.js","_app/immutable/chunks/index.60620a8d.js","_app/immutable/chunks/LoginGuard.658c6d72.js","_app/immutable/chunks/LoginForm.b0b1e4a3.js"];
export const stylesheets = ["_app/immutable/assets/TagGroup.c55baf5b.css"];
export const fonts = [];
