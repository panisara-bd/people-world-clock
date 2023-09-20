import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import { useTokenStore } from '@/stores/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => AuthView
    }
  ]
})

router.beforeEach((to) => {
  const tokenStore = useTokenStore()
  if (!tokenStore.token && to.name !== 'auth') {
    return { name: 'auth' }
  }
})

export default router
