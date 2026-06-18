import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatternView from '../views/PatternView.vue'
import PracticeView from '../views/PracticeView.vue' // <-- Import the new view

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/patterns',
      name: 'patterns',
      component: PatternView
    },
    {
      // The :subject makes it dynamic, so it catches /practice/math or /practice/physics
      path: '/practice/:subject', 
      name: 'practice',
      component: PracticeView,
      props: true // This allows the component to easily read the subject parameter
    }
  ]
})

export default router