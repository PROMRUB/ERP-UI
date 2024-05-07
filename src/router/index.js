import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/customerinfomation',
      name: 'customerinfomation',
      component: () => import('../views/CustomerInformationView.vue')
    },
    {
      path: '/customeraddress',
      name: 'customeraddress',
      component: () => import('../views/CustomerAddressView.vue')
    }
  ]
})

export default router
