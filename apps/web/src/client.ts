import { createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import Main from './main.vue'
import { createRoute } from './routes'

const app = createSSRApp(Main)

const router = createRoute(createWebHistory())
app.use(router)

router.isReady().then(() => {
  app.mount('#root')
})
