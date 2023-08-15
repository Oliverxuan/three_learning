import { createRouter, createWebHistory } from 'vue-router'
import day2 from '../day2.vue'
import day3 from '../day3.vue'
import day4 from '../day4.vue'
import shader from '../shader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/day2',
      name: 'day2',
      component: day2
    }, {
      path: '/day3',
      name: 'day3',
      component: day3
    }, {
      path: '/day4',
      name: 'day4',
      component: day4
    }, {
      path: '/shader',
      name: 'shader',
      component: shader
    }
  ]
})

export default router
