import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { 
    path: '/proyek/:slug',
    name: 'project-detail', 
    component: ProjectDetailView 
  },
  { 
    path: '/admin', 
    name: 'admin', 
    component: AdminView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' }; // Selalu scroll ke atas (0) dengan mulus
    }
  }
})

// Navigation Guard (Satpam Pintu Router)
router.beforeEach((to, from, next) => {
  // Cek apakah ada token di localStorage
  const isAuthenticated = localStorage.getItem('admin_token')

  // Jika halaman butuh login, tapi tidak ada token -> Lempar ke halaman Login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  // Jika user sudah punya token, tapi mencoba buka halaman login -> Lempar ke Admin
  else if (to.name === 'login' && isAuthenticated) {
    next('/admin')
  } 
  // Selain itu, izinkan lewat
  else {
    next()
  }
})

export default router