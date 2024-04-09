import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/index.scss'

import router from "@/plugins/router"
import database from "@/plugins/database"
import directives from './directives'

const app = createApp(App)

router(app)
database(app)
directives(app)

app.mount('#app')
