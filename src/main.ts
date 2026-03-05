import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import router vừa tạo

const app = createApp(App)
app.use(router) // Kích hoạt router
app.mount('#app')