

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a156dda7.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/stores.6461a36b.js","_app/immutable/chunks/singletons.322b0c73.js","_app/immutable/chunks/index.b36f6ad1.js"];
export const stylesheets = [];
export const fonts = [];
