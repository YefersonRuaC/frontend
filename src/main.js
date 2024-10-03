import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useToast } from 'vue-toast-notification'
import "vue-toast-notification/dist/theme-sugar.css"

const app = createApp(App)

const $toast = useToast({
    duration: 5000,
    position: 'top-right'
})

app.use(createPinia())
app.use(router)
app.provide('toast', $toast);

app.mount('#app')
