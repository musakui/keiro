const routes = [
	{
		path: '/', name: 'landing',
		component: () => import('./under-construction.vue'),
	},
	{ path: '/:m(.*)', redirect: '/' },
]

export const routerConfig = {
	routes,
}