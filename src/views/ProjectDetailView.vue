<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import NavBar from '../components/Navbar.vue'

const route = useRoute()
const router = useRouter()
const project = ref(null)
const isLoading = ref(true)
const selectedImage = ref(null)

const API_URL = 'https://api.abimantra.my.id/api'

const formatTechStack = (data) => {
  if (!data) return [];
  let strData = typeof data === 'string' ? data : JSON.stringify(data);
  let cleanStr = strData.replace(/[\[\]"\\]/g, '');
  return cleanStr.split(',').map(s => s.trim()).filter(s => s !== '');
}

const formatGallery = (data) => {
  if (!data) return [];
  let strData = typeof data === 'string' ? data : JSON.stringify(data);
  let cleanStr = strData.replace(/[\[\]"\\]/g, '');
  return cleanStr.split(',').map(s => s.trim()).filter(s => s !== '' && s.startsWith('http'));
}


const openLightbox = (imgUrl) => {
  selectedImage.value = imgUrl
  
  document.body.style.overflow = 'hidden' 
}


const closeLightbox = () => {
  selectedImage.value = null
  document.body.style.overflow = 'auto'
}


const handleKeyDown = (e) => {
  if (e.key === 'Escape' && selectedImage.value) {
    closeLightbox()
  }
}

onMounted(async () => {
  document.addEventListener('keydown', handleKeyDown)
  try {
    const res = await axios.get(`${API_URL}/projects`)
    const foundProject = res.data.find(p => p.slug === route.params.slug)
    
    if (foundProject) {
      project.value = foundProject
      document.title = `${foundProject.title} | Portofolio abimantra.my.id`
    } else {
      router.push('/proyek')
    }
  } catch (error) {
    console.error("Gagal memuat detail proyek", error)
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <NavBar />

  <main class="min-h-screen pt-32 pb-20 bg-[#f8fafc]">
    <div v-if="isLoading" class="max-w-[1000px] mx-auto px-6 py-20 text-center text-brand-muted animate-pulse">
      Memuat detail portofolio...
    </div>

    <article v-else-if="project" class="max-w-[1000px] mx-auto px-6 animate-fade-in-up">
      
      <router-link to="/proyek" class="inline-flex items-center gap-2 text-sm font-bold text-brand-muted hover:text-brand-accent transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Portofolio
      </router-link>

      <header class="mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold text-brand-main mb-4 leading-tight">
          {{ project.title }}
        </h1>
        <p class="text-xl text-brand-muted max-w-3xl mb-8">
          {{ project.short_description }}
        </p>

        <div class="flex flex-wrap gap-2">
          <span v-for="(tech, i) in formatTechStack(project.tech_stack)" :key="i" class="px-4 py-1.5 bg-white border border-brand-border text-brand-main text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
            {{ tech }}
          </span>
        </div>
      </header>

      <div v-if="project.image_url" class="w-full aspect-video rounded-[2rem] overflow-hidden mb-12 shadow-xl border border-gray-100 bg-gray-200">
        <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div class="lg:col-span-2 space-y-12">
          <section>
            <h2 class="text-2xl font-bold text-brand-main mb-6">Tentang Proyek</h2>
            <div class="prose prose-lg max-w-none text-brand-muted leading-relaxed" v-html="project.description">
            </div>
          </section>

          <section v-if="formatGallery(project.gallery).length > 0">
            <h2 class="text-2xl font-bold text-brand-main mb-6">Galeri Aplikasi</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(img, idx) in formatGallery(project.gallery)" :key="idx" 
                   @click="openLightbox(img)"
                   class="relative aspect-video rounded-2xl overflow-hidden border border-brand-border shadow-sm bg-gray-100 group cursor-zoom-in">
                
                <img :src="img" alt="Screenshot Aplikasi" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>

              </div>
            </div>
          </section>

        </div>

        <aside class="space-y-6">
          <div class="bg-white p-8 rounded-3xl border border-brand-border shadow-sm sticky top-32">
            <h3 class="text-lg font-bold text-brand-main mb-2">Tertarik dengan aplikasi ini?</h3>
            <p class="text-sm text-brand-muted mb-8">Cobalah versi demonya secara langsung atau hubungi kami untuk penerapan di sekolah Anda.</p>
            
            <a v-if="project.demo_url" :href="project.demo_url" target="_blank" class="flex items-center justify-center gap-2 w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 mb-4">
              Kunjungi Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a href="https://t.me/mantraabi" target="_blank" class="flex items-center justify-center gap-2 w-full py-4 bg-blue-50 text-brand-main font-bold rounded-xl hover:bg-blue-100 transition-colors border border-blue-100">
              Konsultasi Instalasi
            </a>
          </div>
        </aside>

      </div>
    </article>
  </main>
  
  <footer class="py-10 border-t border-brand-border text-center text-brand-muted text-sm bg-white">
    <div class="max-w-[1000px] mx-auto px-6">
      <p>&copy; 2026 All rights reserved. <a href="https://abimantra.my.id" class="text-brand-main font-semibold hover:text-brand-accent transition-colors">abimantra.my.id</a></p>
    </div>
  </footer>

  <Teleport to="body">
    <div v-if="selectedImage" 
         class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-sm transition-opacity"
         @click="closeLightbox">
      
      <button @click.stop="closeLightbox" class="absolute top-6 right-6 p-3 text-white/60 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all focus:outline-none cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <img :src="selectedImage" 
           alt="Fullscreen Preview" 
           class="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-zoom-in" 
           @click.stop /> </div>
  </Teleport>

</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Animasi membesar untuk Lightbox */
.animate-zoom-in {
  animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>