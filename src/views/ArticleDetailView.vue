<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import NavBar from '../components/Navbar.vue' 

const route = useRoute()
const router = useRouter()
const article = ref(null)
const isLoading = ref(true)

const API_URL = 'https://api.abimantra.my.id/api'

onMounted(async () => {
  try {
    const res = await axios.get(`${API_URL}/articles`)
    
    const foundArticle = res.data.find(a => a.slug === route.params.slug)
    
    if (foundArticle) {
      article.value = foundArticle
      
     
      document.title = `${foundArticle.title} | abimantra.my.id`
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', foundArticle.excerpt);
      }
    } else {
    
      router.push('/artikel')
    }
  } catch (error) {
    console.error("Gagal memuat detail artikel", error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NavBar />

  <main class="max-w-[800px] mx-auto px-6 pt-36 pb-20 min-h-screen">
    
    <div v-if="isLoading" class="text-center py-20 text-brand-muted animate-pulse">
      Memuat isi artikel...
    </div>

    <article v-else-if="article" class="animate-fade-in-up">
      
      <router-link to="/artikel" class="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-accent transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Daftar Artikel
      </router-link>

      <div class="mb-10">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 bg-blue-50 text-brand-accent text-xs font-bold uppercase tracking-wider rounded-md border border-blue-100">
            {{ article.category }}
          </span>
          <span class="text-sm font-medium text-brand-muted">{{ article.publish_date }}</span>
        </div>
        
        <h1 class="text-3xl md:text-5xl font-extrabold text-brand-main leading-tight mb-6">
          {{ article.title }}
        </h1>
      </div>

      <div v-if="article.image_url" class="w-full h-[250px] md:h-[400px] rounded-3xl overflow-hidden mb-12 border border-brand-border shadow-sm">
        <img :src="article.image_url" :alt="article.title" class="w-full h-full object-cover" />
      </div>

      <div class="prose prose-lg prose-blue max-w-none text-brand-muted leading-relaxed whitespace-pre-line">
        {{ article.content }}
      </div>

    </article>
  </main>
  <footer class="py-10 border-t border-brand-border mt-16 text-center text-brand-muted text-sm">
    <div class="max-w-[1000px] mx-auto px-6">
      <p>&copy; 2026 All rights reserved. <a href="https://abimantra.my.id" class="text-brand-main font-semibold hover:text-brand-accent transition-colors">abimantra.my.id</a></p>
    </div>
  </footer>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>