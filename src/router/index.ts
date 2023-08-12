import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../App.vue'
import text from '../text.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },    {
      path: '/text',
      name: 'text',
      component: text
    }
  ]
})

export default router
