

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/inspire/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.e1611385.js","_app/immutable/chunks/scheduler.e851ad51.js","_app/immutable/chunks/index.3c0515f8.js"];
export const stylesheets = [];
export const fonts = [];
