

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/posts/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.21b00264.js","_app/immutable/chunks/scheduler.97adf797.js","_app/immutable/chunks/index.7119c0cc.js","_app/immutable/chunks/stores.ec997d15.js","_app/immutable/chunks/singletons.a77e5c97.js","_app/immutable/chunks/index.15707502.js","_app/immutable/chunks/postService.aca46ca5.js","_app/immutable/chunks/index.3953fd75.js","_app/immutable/chunks/Alerts.35b37a9a.js","_app/immutable/chunks/SvelteMarkdown.d763be15.js","_app/immutable/chunks/marked.esm.c82fe51b.js","_app/immutable/chunks/TagGroup.68de5e81.js","_app/immutable/chunks/LoginGuard.cd1ff462.js","_app/immutable/chunks/LoginForm.4925c669.js"];
export const stylesheets = ["_app/immutable/assets/TagGroup.aae09b7f.css"];
export const fonts = [];
