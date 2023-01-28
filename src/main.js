import '@unocss/reset/tailwind.css'
import 'uno.css'
import { ViteSSG } from 'vite-ssg'
import { routerConfig } from './routes/index.js'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import App from './App.vue'
export const createApp = ViteSSG(App, routerConfig, (ctx) => {
	ctx.app.use(createI18n({
		legacy: false,
		locale: globalThis.navigator?.language ?? 'en',
		messages,
		...(import.meta.hot ? {
			missingWarn: false,
			fallbackWarn: false,
		} : null),
	}))
})