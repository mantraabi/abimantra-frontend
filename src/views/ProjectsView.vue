<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NavBar from '../components/Navbar.vue'

const projects = ref([])
const isLoading = ref(true)
const API_URL = 'https://api.abimantra.my.id/api'

const formatTechStack = (data) => {
  if (!data) return [];
  
  let strData = typeof data === 'string' ? data : JSON.stringify(data);
  
  // 👉 UBAH BARIS INI: Tambahkan \\ di dalam kurung siku Regex
  let cleanStr = strData.replace(/[\[\]"\\]/g, '');
  
  return cleanStr.split(',').map(s => s.trim()).filter(s => s !== '');
}

onMounted(async () => {
  document.title = 'Portofolio & Proyek | abimantra.my.id'
  
  try {
    const res = await axios.get(`${API_URL}/projects`)
    projects.value = res.data
  } catch (error) {
    console.error("Gagal mengambil data proyek:", error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NavBar />

  <main class="max-w-[1200px] mx-auto px-6 pt-36 pb-20 min-h-screen">
    <div class="text-center mb-16">
      <h1 class="text-3xl md:text-5xl font-extrabold text-brand-main mb-6">Portofolio & Karya</h1>
      <p class="text-brand-muted text-lg max-w-2xl mx-auto">
        Kumpulan sistem dan aplikasi pendidikan yang telah kami kembangkan untuk membantu digitalisasi sekolah di seluruh Indonesia.
      </p>
    </div>

    <div v-if="isLoading" class="py-20 text-center text-brand-muted animate-pulse">
      Memuat daftar proyek...
    </div>

    <div v-else>
      <div v-if="projects.length === 0" class="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <p class="text-brand-muted italic">Belum ada portofolio yang dipublikasikan.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.id" class="group bg-white rounded-[2rem] border border-brand-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
          
          <div class="relative h-56 overflow-hidden bg-gray-100">
            <img v-if="project.image_url" :src="project.image_url" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            
            <div v-if="project.is_featured" class="absolute top-4 right-4 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              Unggulan
            </div>
          </div>

          <div class="p-8 flex flex-col flex-1">
            <h3 class="text-xl font-bold text-brand-main mb-3 group-hover:text-brand-accent transition-colors">{{ project.title }}</h3>
            <p class="text-brand-muted text-sm mb-6 flex-1">{{ project.short_description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-8">
              <span v-for="(tech, i) in formatTechStack(project.tech_stack).slice(0, 3)" :key="i" class="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                {{ tech }}
              </span>
              <span v-if="formatTechStack(project.tech_stack).length > 3" class="px-2.5 py-1 text-gray-400 text-[10px] font-bold">
                +{{ formatTechStack(project.tech_stack).length - 3 }}
              </span>
            </div>

            <router-link :to="`/proyek/${project.slug}`" class="inline-flex items-center justify-center w-full py-3 bg-blue-50 text-brand-main font-bold rounded-xl hover:bg-brand-accent hover:text-white transition-colors gap-2">
              Lihat Detail
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16 pt-8 border-t border-brand-border text-center">
      <router-link to="/" class="inline-flex items-center gap-2 text-sm font-bold text-brand-main hover:text-brand-accent transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </router-link>
    </div>
  </main>
  <footer class="py-10 border-t border-brand-border mt-16 text-center text-brand-muted text-sm">
    <div class="max-w-[1000px] mx-auto px-6">
      <p>&copy; 2026 All rights reserved. <a href="https://abimantra.my.id" class="text-brand-main font-semibold hover:text-brand-accent transition-colors">abimantra.my.id</a></p>
    </div>
  </footer>
</template>