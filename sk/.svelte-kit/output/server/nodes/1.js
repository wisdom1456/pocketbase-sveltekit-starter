

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.3bac0384.js","_app/immutable/chunks/scheduler.97adf797.js","_app/immutable/chunks/index.7119c0cc.js","_app/immutable/chunks/stores.ec997d15.js","_app/immutable/chunks/singletons.a77e5c97.js","_app/immutable/chunks/index.15707502.js"];
export const stylesheets = [];
export const fonts = [];
