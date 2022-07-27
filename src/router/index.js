import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Passport from '@/views/passport.vue'

const routes = [
  {
    path: '/',
    name: 'passport',
    component: Passport
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
