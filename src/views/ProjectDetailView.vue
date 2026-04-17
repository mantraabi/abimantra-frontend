<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import NavBar from '../components/Navbar.vue' // Pastikan nama file sama persis

const route = useRoute()
const router = useRouter()
const project = ref(null)
const isLoading = ref(true)

const API_URL = 'https://api.abimantra.my.id/api'

// Fungsi format Tech Stack (sama seperti di Home)
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

onMounted(async () => {
  try {
    // Ambil semua proyek dari API
    const res = await axios.get(`${API_URL}/projects`)
    
    // Cari proyek yang ID-nya sama dengan parameter URL
    const foundProject = res.data.find(p => p.slug === parseInt(route.params.slug))
    
    if (foundProject) {
      project.value = foundProject
      document.title = `${foundProject.title} | abimantra.my.id`
    } else {
      // Jika ID tidak ditemukan, kembalikan ke beranda
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

  <main class="max-w-[800px] mx-auto px-6 py-20 min-h-screen">
    
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

      <div class="flex flex-wrap items-center gap-4 border-t border-brand-border pt-8">
        <a v-if="project.demo_url" :href="project.demo_url" target="_blank" rel="noopener noreferrer" 
           class="px-8 py-4 bg-brand-main text-white rounded-xl font-bold hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 shadow-md">
          Kunjungi Website
        </a>
      </div>

    </div>
  </main>
</template>

<style scoped>
/* Animasi Muncul Halus */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>