import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout/MainLayout.vue'
import AccountLayout from '@/layouts/AccountLayout/AccountLayout.vue'
import HomeView from '../pages/HomeView/HomeView.vue'
import SignIn from '@/pages/Account/SignIn/SignIn.vue'
import SignUp from '@/pages/Account/SignUp/SignUp.vue'
import SentEmail from '@/pages/Account/SentEmail/SentEmail.vue'
import AccountActivation from '@/pages/Account/AccountActivation/AccountActivation.vue'
import AccountActivated from '@/pages/Account/AccountActivated/AccountActivated.vue'
import { useUserStore } from '@/stores/useUserStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView,
        },
      ],
    },
    {
      path: '',
      component: AccountLayout,
      children: [
        {
          path: '/sign-in',
          name: 'SignIn',
          component: SignIn,
        },
        {
          path: '/sign-up',
          name: 'SignUp',
          component: SignUp,
        },
        {
          path: '/sent-email',
          name: 'SentEmail',
          component: SentEmail,
        },
        {
          path: '/account-activation',
          name: 'AccountActivation',
          component: AccountActivation,
        },
        {
          path: '/account-activated',
          name: 'AccountActivated',
          component: AccountActivated,
        },
      ],
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  const publicRoutes = [
    '/sign-up',
    '/sign-in',
    '/sent-email',
    '/account-activation',
    '/account-activated',
  ]

  if (!publicRoutes.includes(to.path)) {
    await userStore.fetchCurrent()
  }

  next()
})

export default router
