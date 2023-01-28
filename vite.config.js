import path from 'node:path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import uno from 'unocss/vite'
import i18n from '@intlify/unplugin-vue-i18n/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config
export default defineConfig({
	plugins: [
		uno(),
		vue(),
		i18n({
			fullInstall: false,
			defaultSFCLang: 'json5',
			include: path.resolve(__dirname, './locales/**'),
		}),
	],
	define: {
		__INTLIFY_PROD_DEVTOOLS__: false,
		__NETLIFY_PROD__: process.env.CONTEXT === 'production',
	},
	build: {
		target: 'esnext',
	},
	ssr: {
		noExternal: [
			/vue-i18n/,
		],
	},
	ssgOptions: {
		script: 'async',
		dirStyle: 'nested',
		formatting: 'minify',
	},
})