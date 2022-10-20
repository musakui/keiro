import path from 'node:path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windi from 'vite-plugin-windicss'
import i18n from '@intlify/vite-plugin-vue-i18n'
import colors from './tools/vite-plugin-windi-colors.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config
export default defineConfig({
	plugins: [
		windi(),
		colors(),
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
	ssgOptions: {
		script: 'async',
		dirStyle: 'nested',
		formatting: 'minify',
	},
})