

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/inspire/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.4a229aaf.js","_app/immutable/chunks/scheduler.edb94b3b.js","_app/immutable/chunks/index.ab6f206b.js"];
export const stylesheets = [];
export const fonts = [];
