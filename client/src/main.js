import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/index.scss'

import router from "@/plugins/router"

const app = createApp(App)
router(app)

app.mount('#app')
