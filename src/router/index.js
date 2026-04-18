import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import ProjectsView from '../views/ProjectsView.vue'



const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/proyek', name: 'projects', component: ProjectsView },
  { path: '/proyek/:slug', name: 'project-detail', component: ProjectDetailView},
  { path: '/artikel', name: 'articles', component: ArticlesView },
  { path: '/artikel/:slug', name: 'article-detail', component: ArticleDetailView },
  { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})


router.beforeEach((to, from, next) => {
  
  const isAuthenticated = localStorage.getItem('admin_token')

  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  
  else if (to.name === 'login' && isAuthenticated) {
    next('/admin')
  } 
  
  else {
    next()
  }
})

export default router