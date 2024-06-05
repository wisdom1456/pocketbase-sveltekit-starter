

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/help/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.2a376584.js","_app/immutable/chunks/scheduler.e851ad51.js","_app/immutable/chunks/index.3c0515f8.js"];
export const stylesheets = [];
export const fonts = [];
