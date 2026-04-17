<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import NavBar from '../components/Navbar.vue' 

const route = useRoute()
const router = useRouter()
const project = ref(null)
const isLoading = ref(true)

const API_URL = 'https://api.abimantra.my.id/api'

const formatTechStack = (tech) => {
  if (!tech) return []
  if (Array.isArray(tech)) return tech
  try {
    const parsed = JSON.parse(tech)
    if (typeof parsed === 'string') return JSON.parse(parsed)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch (error) {
    return tech.replace(/[\[\]"']/g, '').split(',').map(s => s.trim())
  }
}

const getGallery = (galleryStr) => {
  if (!galleryStr) return []
  try {
    const parsed = JSON.parse(galleryStr)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`${API_URL}/projects`)
    const foundProject = res.data.find(p => p.slug === route.params.slug)
    
    if (foundProject) {
      project.value = foundProject
      
      document.title = `${foundProject.title} | abimantra.my.id`
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {

        const descText = foundProject.short_description || foundProject.description.substring(0, 150) + '...';
        metaDesc.setAttribute('content', descText);
      }
      
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error("Gagal memuat detail proyek", error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NavBar />

  <main class="max-w-[800px] mx-auto px-6 pt-36 pb-20 min-h-screen">
    
    <div v-if="isLoading" class="text-center py-20 text-brand-muted animate-pulse">
      Memuat detail proyek...
    </div>

    <div v-else-if="project" class="animate-fade-in-up">
      
      <router-link to="/" class="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-accent transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </router-link>

      <h1 class="text-4xl md:text-5xl font-extrabold text-brand-main mb-6 leading-tight">
        {{ project.title }}
      </h1>

      <div v-if="project.tech_stack" class="flex flex-wrap gap-2 mb-10">
        <span v-for="(tech, idx) in formatTechStack(project.tech_stack)" :key="idx" 
              class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md">
          {{ tech }}
        </span>
      </div>

      <div v-if="project.image_url" class="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-10 border border-brand-border shadow-sm">
        <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover" />
      </div>

      <div class="prose prose-lg prose-blue max-w-none text-brand-muted leading-relaxed whitespace-pre-line mb-12">
        {{ project.description }}
      </div>

      <section v-if="getGallery(project.gallery).length > 0" class="mt-16 mb-12">
        <h3 class="text-2xl font-bold text-brand-main mb-6">Galeri Aplikasi</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="(img, idx) in getGallery(project.gallery)" :key="idx" class="rounded-2xl overflow-hidden border border-brand-border shadow-sm hover:shadow-md transition-shadow">
            <img :src="img" loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" :alt="`Galeri ${project.title} ${idx + 1}`" />
          </div>
        </div>
      </section>

      <div class="flex flex-wrap items-center gap-4 border-t border-brand-border pt-8">
        <a v-if="project.demo_url" :href="project.demo_url" target="_blank" rel="noopener noreferrer" 
           class="px-8 py-4 bg-brand-main text-white rounded-xl font-bold hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 shadow-md">
          Kunjungi Website
        </a>
      </div>

      <section class="mt-16 p-8 bg-gray-50 rounded-3xl border border-dashed border-brand-border text-center sm:text-left sm:flex items-center justify-between gap-6">
        <div>
          <h3 class="text-xl font-bold text-brand-main mb-2">Tertarik dengan sistem ini?</h3>
          <p class="text-brand-muted text-sm mb-4 sm:mb-0">Saya siap membantu pemasangan, penyesuaian fitur, atau diskusi teknis lebih lanjut.</p>
        </div>
        <div class="flex flex-wrap gap-3 justify-center">
          <a href="https://t.me/abimantra" target="_blank" class="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors whitespace-nowrap">
            Telegram Saya
          </a>
        </div>
      </section>

    </div>
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