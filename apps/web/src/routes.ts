import type { RouteRecordRaw, RouterHistory } from 'vue-router'
import { createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('./pages/Layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('./pages/Home.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('./pages/About.vue'),
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('./pages/Dashboard.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('./pages/NoMatch.vue'),
      },
    ],
  },
] satisfies RouteRecordRaw[]

export function createRoute(history: RouterHistory) {
  return createRouter({
    history,
    routes,
  })
}
