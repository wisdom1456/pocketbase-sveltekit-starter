export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/auditlog/[coll]/[id]": [3],
		"/create": [4],
		"/explore": [5],
		"/hello": [6],
		"/help": [7],
		"/inspire": [8],
		"/keyboard-shortcuts": [9],
		"/posts": [10],
		"/posts/[slug]": [11],
		"/posts/[slug]/edit": [12],
		"/posts/[slug]/inspire": [13],
		"/reflect": [14],
		"/remember": [15],
		"/settings": [16],
		"/subposts/[slug]": [17],
		"/tags/[tag]": [18]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';