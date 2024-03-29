import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/vars.css'
import '@/assets/styles/effects.css'
import '@/assets/styles/flex.css'
import '@/assets/styles/inputs.css'
import '@/assets/styles/main.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/spacings.css'

import '@/assets/styles/tabs.css'

import router from "@/plugins/router"

const app = createApp(App)
router(app)

app.mount('#app')
