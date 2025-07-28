import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout/MainLayout.vue'
import AccountLayout from '@/layouts/AccountLayout/AccountLayout.vue'
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
          component: () => import('@/pages/Home/HomeView.vue'),
        },
        {
          path: 'recipe',
          children: [
            {
              path: ':id',
              name: 'Recipe',
              component: () => import('@/pages/Recipes/Recipe/RecipesRecipe.vue'),
            },
            {
              path: 'search',
              name: 'RecipesSearch',
              component: () => import('@/pages/Recipes/Search/RecipesSearch.vue'),
            },
          ],
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
          component: () => import('@/pages/Account/SignIn/SignIn.vue'),
        },
        {
          path: '/sign-up',
          name: 'SignUp',
          component: () => import('@/pages/Account/SignUp/SignUp.vue'),
        },
        {
          path: '/sent-email',
          name: 'SentEmail',
          component: () => import('@/pages/Account/SentEmail/SentEmail.vue'),
        },
        {
          path: '/account-activation',
          name: 'AccountActivation',
          component: () => import('@/pages/Account/AccountActivation/AccountActivation.vue'),
        },
        {
          path: '/account-activated',
          name: 'AccountActivated',
          component: () => import('@/pages/Account/AccountActivated/AccountActivated.vue'),
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
