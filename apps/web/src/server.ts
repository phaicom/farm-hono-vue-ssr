import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'

import { renderToString } from 'vue/server-renderer'
import Main from './main.vue'
import { createRoute } from './routes'

export default async function render(url: string) {
  const app = createSSRApp(Main)
  const route = createRoute(createMemoryHistory())
  route.push(url)
  await route.isReady()

  app.use(route)

  return renderToString(app)
}
