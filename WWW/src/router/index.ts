import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '../pages/HomeView/HomeView.vue'
import LogIn from '@/pages/LogIn/LogIn.vue'
import SignIn from '@/pages/SignIn/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView,
        },
        {
          path: '/log-in',
          name: 'LogIn',
          component: LogIn,
        },
        {
          path: '/sign-in',
          name: 'SignIn',
          component: SignIn,
        },
      ],
    },
  ],
})

export default router
