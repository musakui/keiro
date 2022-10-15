import 'virtual:windi.css'
import { ViteSSG } from 'vite-ssg'
import { routerConfig } from './routes/index.js'
import App from './App.vue'
export const createApp = ViteSSG(App, routerConfig)