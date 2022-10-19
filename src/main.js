import 'virtual:windi.css'
import { ViteSSG } from 'vite-ssg'
import { routerConfig } from './routes/index.js'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import App from './App.vue'
export const createApp = ViteSSG(App, routerConfig, (ctx) => {
	ctx.app.use(createI18n({
		legacy: false,
		locale: globalThis.navigator?.language ?? 'en',
		messages,
		...(import.meta.env.DEV ? {
			missingWarn: false,
			fallbackWarn: false,
		} : null),
	}))
})