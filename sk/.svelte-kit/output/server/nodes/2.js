

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.f7db416a.js","_app/immutable/chunks/scheduler.c76fa77e.js","_app/immutable/chunks/index.315486b9.js","_app/immutable/chunks/metadataStore.28e9e3ce.js","_app/immutable/chunks/index.b36f6ad1.js","_app/immutable/chunks/index.60620a8d.js"];
export const stylesheets = [];
export const fonts = [];
