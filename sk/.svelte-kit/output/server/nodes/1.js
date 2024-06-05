

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a645b27e.js","_app/immutable/chunks/scheduler.e851ad51.js","_app/immutable/chunks/index.3c0515f8.js","_app/immutable/chunks/stores.e9fd1b55.js","_app/immutable/chunks/singletons.82136565.js","_app/immutable/chunks/index.236bb830.js"];
export const stylesheets = [];
export const fonts = [];
