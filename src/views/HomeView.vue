<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import NavBar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import SectionLabel from '../components/SectionLabel.vue'
import FeaturedProject from '../components/FeaturedProject.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import ContactSection from '../components/ContactSection.vue'
import StatsSection from '../components/StatsSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import FAQSection from '../components/FAQSection.vue'

const featuredProject = ref(null)
const otherProjects = ref([])
const articles = ref([])
const isLoading = ref(true)

const API_URL = 'https://api.abimantra.my.id/api'

const formatTechStack = (data) => {
  if (!data) return [];
  
  let strData = typeof data === 'string' ? data : JSON.stringify(data);
  
  // 👉 UBAH BARIS INI: Tambahkan \\ di dalam kurung siku Regex
  let cleanStr = strData.replace(/[\[\]"\\]/g, '');
  
  return cleanStr.split(',').map(s => s.trim()).filter(s => s !== '');
}

const fetchData = async () => {
  try {
    const [projectsRes, articlesRes] = await Promise.all([
      axios.get(`${API_URL}/projects`),
      axios.get(`${API_URL}/articles`)
    ])

    const allProjects = projectsRes.data;
    featuredProject.value = allProjects.find(p => p.is_featured === true)
    otherProjects.value = allProjects.filter(p => p.is_featured === false)
    articles.value = articlesRes.data.slice(0, 3)

  } catch (error) {
    console.error("Gagal mengambil data:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
  document.title = 'Abimantra.my.id | Web Developer & Portofolio'
})
</script>

<template>
  <NavBar />

  <main class="max-w-[1000px] mx-auto px-6">
    <HeroSection />

    <div v-if="isLoading" class="py-20 text-center text-brand-muted">
      Memuat data dari server...
    </div>

    <div v-else>
      <section id="proyek" class="py-16">
        <SectionLabel title="Fokus Saat Ini" />
        
         <FeaturedProject 
          v-if="featuredProject"
          badge="Proyek Utama"
          :title="featuredProject.title"
          :slug="featuredProject.slug"
          :description="featuredProject.short_description || featuredProject.description"
          :techStack="formatTechStack(featuredProject.tech_stack)"
          :imageUrl="featuredProject.image_url"  
          :demoUrl="featuredProject.demo_url"    
        />

        <div class="mt-12 text-center">
          <router-link to="/proyek" class="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-main font-bold rounded-xl hover:bg-brand-main hover:text-white transition-all duration-300 border border-brand-border hover:border-brand-main shadow-sm">
            Lihat Semua Portofolio
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
      </section>
      
      <StatsSection />
      <ServicesSection />
      <TestimonialSection />
      <FAQSection />
      

            <section id="artikel" class="py-16">
              <SectionLabel title="Catatan Pengembangan" />
              <div class="flex flex-col gap-4">
                <div v-if="articles.length === 0" class="text-brand-muted italic">
                  Belum ada artikel yang dipublikasikan.
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
              
              <div v-if="articles.length > 0" class="mt-10 text-center">
                <router-link to="/artikel" class="inline-flex items-center gap-2 px-8 py-3 bg-blue-50 text-brand-main font-bold rounded-xl hover:bg-brand-main hover:text-white transition-all duration-300 border border-blue-100 hover:border-brand-main">
                  Lihat Semua Artikel
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </router-link>
              </div>
            </section>
    </div>

    <ContactSection />
  </main>

  <footer class="py-10 border-t border-brand-border mt-16 text-center text-brand-muted text-sm">
    <div class="max-w-[1000px] mx-auto px-6">
      <p>&copy; 2026 All rights reserved. <a href="https://abimantra.my.id" class="text-brand-main font-semibold hover:text-brand-accent transition-colors">abimantra.my.id</a></p>
    </div>
  </footer>
</template>