import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PatternView from '../views/PatternView.vue'
import PracticeView from '../views/PracticeView.vue'
import AiTutorView from '../views/AiTutorView.vue'
import ProgressView from '../views/ProgressView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideNav: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { hideNav: true }
    },
    {
      // /patterns with no subject redirects to math as default
      path: '/patterns',
      redirect: '/patterns/math'
    },
    {
      // Catches /patterns/math, /patterns/physics, etc.
      path: '/patterns/:subject',
      name: 'patterns',
      component: PatternView,
      props: true
    },
    {
      // Catches /practice/math?patternId=1, /practice/physics?patternId=3, etc.
      path: '/practice/:subject',
      name: 'practice',
      component: PracticeView,
      props: true
    },
    {
      path: '/ai-tutor',
      name: 'ai-tutor',
      component: AiTutorView
    },
    {
      // /tutor is used in old nav links — redirect to the correct path
      path: '/tutor',
      redirect: '/ai-tutor'
    },
    {
      path: '/progress',
      name: 'progress',
      component: ProgressView
    }
  ]
})

export default router
