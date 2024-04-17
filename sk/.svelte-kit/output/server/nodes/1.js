

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.43cbf855.js","_app/immutable/chunks/scheduler.edb94b3b.js","_app/immutable/chunks/index.ab6f206b.js","_app/immutable/chunks/stores.9c1bddb2.js","_app/immutable/chunks/singletons.7ecd36fa.js"];
export const stylesheets = [];
export const fonts = [];
