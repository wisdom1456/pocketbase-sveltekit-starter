

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/help/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.1229a5ea.js","_app/immutable/chunks/scheduler.97adf797.js","_app/immutable/chunks/index.7119c0cc.js"];
export const stylesheets = [];
export const fonts = [];
