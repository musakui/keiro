const routes = [
	{
		path: '/', name: 'landing',
		component: () => import('./under-construction.vue'),
	},
	{
		path: '/about/', name: 'about',
		component: () => import('./about.vue'),
	},
	{
		path: '/search/', name: 'search',
		component: () => import('./search.vue'),
	},
	{
		path: '/p/:place_id', name: 'place',
		component: () => import('./place.vue'),
	},
	{
		path: '/places/', name: 'places',
		component: () => import('./places.vue'),
	},
	...(__NETLIFY_PROD__ ? [] : [{
		path: '/admin', name: 'admin',
		component: () => import('./admin.vue'),
	}]),
	{ path: '/:m(.*)', redirect: '/' },
]

export const routerConfig = {
	routes,
	strict: true,
}