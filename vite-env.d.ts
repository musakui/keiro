declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv {
	readonly VITE_GMAPS_API_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}