import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/customerInfomation',
      name: 'customerInfomation',
      component: () => import('../views/CustomerInformationView.vue')
    },
    {
      path: '/customerAddress',
      name: 'customerAddress',
      component: () => import('../views/CustomerAddressView.vue')
    }
  ]
})

export default router
