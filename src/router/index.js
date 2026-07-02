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
      component: HomeView,
      meta: { title: 'PreLearn - Home', icon: '/favicon.ico' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideNav: true, title: 'PreLearn - Sign In', icon: '/favicon.ico' }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { hideNav: true, title: 'PreLearn - Create Account', icon: '/favicon.ico' }
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
      props: true,
      meta: { 
        // Capitalizes the subject name dynamically in the tab title if you want, 
        // or uses a function/listener. We'll set a standard template title here:
        title: 'PreLearn - Study Patterns', 
        icon: '/favicon.ico' 
      }
    },
    {
      // Catches /practice/math?patternId=1, /practice/physics?patternId=3, etc.
      path: '/practice/:subject',
      name: 'practice',
      component: PracticeView,
      props: true,
      meta: { title: 'PreLearn - Practice Session', icon: '/favicon.ico' }
    },
    {
      path: '/ai-tutor',
      name: 'ai-tutor',
      component: AiTutorView,
      meta: { title: 'PreLearn - AI Tutor', icon: '/favicon.ico' }
    },
    {
      // /tutor is used in old nav links — redirect to the correct path
      path: '/tutor',
      redirect: '/ai-tutor'
    },
    {
      path: '/progress',
      name: 'progress',
      component: ProgressView,
      meta: { title: 'PreLearn - Track Progress', icon: '/favicon.ico' }
    },
    {
      path: '/study-path',
      name: 'study-path',
      component: () => import('../views/StudyPathView.vue'),
      meta: { title: 'PreLearn - My Study Path', icon: '/favicon.ico' }
    },
    ...(import.meta.env.DEV ? [{
      path: '/dev/seed',
      name: 'dev-seed',
      component: () => import('../views/DevSeedView.vue'),
      meta: { hideNav: true, title: 'Dev Environment - Database Seeding', icon: '/favicon.ico' }
    }] : [])
  ]
})

// Global navigation guard to automatically rewrite Document Title and Favicon
router.afterEach((to) => {
  // 1. Update the document title based on metadata, fallback to default if missing
  document.title = to.meta.title || 'PreLearn';

  // 2. Locate the link tag responsible for the favicon
  let link = document.querySelector("link[rel~='icon']");
  
  // If the link tag doesn't exist, generate it on the fly
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  
  // 3. Swap the icon path dynamically
  link.href = to.meta.icon || '/favicon.ico';
});

export default router