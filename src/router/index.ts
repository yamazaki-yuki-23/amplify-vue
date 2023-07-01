import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Chat from '@/components/Chat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      props: true
    }
  ]
})

export default router
