

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/inspire/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.321c55c4.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js"];
export const stylesheets = [];
export const fonts = [];
