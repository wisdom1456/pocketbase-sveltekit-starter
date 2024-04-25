

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.787c2d61.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/stores.aff678ae.js","_app/immutable/chunks/singletons.d503bb2d.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/postService.6359b3df.js","_app/immutable/chunks/index.1c988bca.js","_app/immutable/chunks/SvelteMarkdown.e865ed39.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/TagGroup.6b49e8b4.js","_app/immutable/chunks/index.60620a8d.js","_app/immutable/chunks/LoginGuard.df2525b9.js","_app/immutable/chunks/LoginForm.811c8c38.js"];
export const stylesheets = ["_app/immutable/assets/TagGroup.c55baf5b.css"];
export const fonts = [];
