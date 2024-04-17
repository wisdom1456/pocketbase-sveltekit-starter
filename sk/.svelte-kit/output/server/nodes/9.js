

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.c25e2329.js","_app/immutable/chunks/scheduler.edb94b3b.js","_app/immutable/chunks/index.ab6f206b.js","_app/immutable/chunks/stores.9c1bddb2.js","_app/immutable/chunks/singletons.7ecd36fa.js","_app/immutable/chunks/postService.05f00e28.js","_app/immutable/chunks/index.3c75d8e0.js","_app/immutable/chunks/SvelteMarkdown.98296c2c.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/TagGroup.80567f3c.js","_app/immutable/chunks/index.a680cd08.js","_app/immutable/chunks/LoginGuard.b5c537ab.js","_app/immutable/chunks/LoginForm.9ae425e7.js"];
export const stylesheets = ["_app/immutable/assets/TagGroup.c55baf5b.css"];
export const fonts = [];
