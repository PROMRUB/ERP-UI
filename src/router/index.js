import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/CustomerInfomation',
      name: 'CustomerInfomation',
      component: () => import('../views/CustomerInformationView.vue')
    },
    {
      path: '/CustomerAddress',
      name: 'CustomerAddress',
      component: () => import('../views/CustomerAddressView.vue')
    }
  ]
})

export default router
