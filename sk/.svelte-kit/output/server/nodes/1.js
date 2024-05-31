

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.3de36baf.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/stores.52db70c1.js","_app/immutable/chunks/singletons.d30dba1f.js","_app/immutable/chunks/index.b36f6ad1.js"];
export const stylesheets = [];
export const fonts = [];
