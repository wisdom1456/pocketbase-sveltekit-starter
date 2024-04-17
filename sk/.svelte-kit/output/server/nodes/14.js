

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/subposts/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/14.4a229aaf.js","_app/immutable/chunks/scheduler.edb94b3b.js","_app/immutable/chunks/index.ab6f206b.js"];
export const stylesheets = [];
export const fonts = [];
