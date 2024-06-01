

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.e74989a5.js","_app/immutable/chunks/scheduler.97adf797.js","_app/immutable/chunks/index.7119c0cc.js","_app/immutable/chunks/metadataStore.965519fa.js","_app/immutable/chunks/index.15707502.js","_app/immutable/chunks/index.3cdded0b.js"];
export const stylesheets = [];
export const fonts = [];
