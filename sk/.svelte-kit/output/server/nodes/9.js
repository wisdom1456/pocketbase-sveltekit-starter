

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.9b2f0255.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/stores.a912c413.js","_app/immutable/chunks/singletons.74ef3276.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/postService.2a4ca333.js","_app/immutable/chunks/index.23ea4071.js","_app/immutable/chunks/Alerts.3d0f1509.js","_app/immutable/chunks/SvelteMarkdown.ba0f761d.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/TagGroup.9a6d7c71.js","_app/immutable/chunks/index.60620a8d.js","_app/immutable/chunks/LoginGuard.4ed2dc58.js","_app/immutable/chunks/LoginForm.a6829b9b.js"];
export const stylesheets = ["_app/immutable/assets/TagGroup.c55baf5b.css"];
export const fonts = [];
