

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.7cb2b262.js","_app/immutable/chunks/scheduler.e851ad51.js","_app/immutable/chunks/index.3c0515f8.js","_app/immutable/chunks/metadataStore.7111b88d.js","_app/immutable/chunks/index.236bb830.js","_app/immutable/chunks/index.97b93fc8.js"];
export const stylesheets = [];
export const fonts = [];
