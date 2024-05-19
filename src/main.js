import './assets/css/main.css'
import './assets/css/no-data.css'

import 'vue-select/dist/vue-select.css'

import vSelect from 'vue-select'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('v-select', vSelect)

app.use(createPinia())
app.use(router)

app.mount('#app')
