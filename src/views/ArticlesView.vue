<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import NavBar from '../components/Navbar.vue'
import ArticleCard from '../components/ArticleCard.vue'

const articles = ref([])
const isLoading = ref(true)
const API_URL = 'https://api.abimantra.my.id/api'

onMounted(async () => {

  document.title = 'Semua Artikel & Catatan | abimantra.my.id'
  
  try {
    const res = await axios.get(`${API_URL}/articles`)
    articles.value = res.data
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NavBar />

  <main class="max-w-[800px] mx-auto px-6 pt-36 pb-20 min-h-screen">
    <div class="mb-12">
      <h1 class="text-3xl md:text-5xl font-extrabold text-brand-main mb-4">Catatan Pengembangan</h1>
      <p class="text-brand-muted text-lg">Kumpulan studi kasus, pembaruan sistem, dan panduan teknis seputar aplikasi sekolah.</p>
    </div>

    <div v-if="isLoading" class="py-20 text-center text-brand-muted animate-pulse">
      Memuat artikel...
    </div>

    <div v-else class="flex flex-col gap-6">
      <div v-if="articles.length === 0" class="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <p class="text-brand-muted italic">Belum ada artikel yang dipublikasikan.</p>
      </div>
      
      <ArticleCard 
        v-for="article in articles"
        :key="article.id"
        :date="article.publish_date"
        :category="article.category"
        :title="article.title"
        :description="article.excerpt"
        :imageUrl="article.image_url" 
        :link="`/artikel/${article.slug}`"
      />
    </div>

    <div class="mt-12 pt-8 border-t border-brand-border text-center">
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