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

const featuredProject = ref(null)
const otherProjects = ref([])
const articles = ref([])
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

const fetchData = async () => {
  try {
    const [projectsRes, articlesRes] = await Promise.all([
      axios.get(`${API_URL}/projects`),
      axios.get(`${API_URL}/articles`)
    ])

    const allProjects = projectsRes.data;
    featuredProject.value = allProjects.find(p => p.is_featured === true)
    otherProjects.value = allProjects.filter(p => p.is_featured === false)
    articles.value = articlesRes.data
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <ProjectCard 
            v-for="project in otherProjects" 
            :key="project.id"
            :slug="project.slug"
            :title="project.title"
            :description="project.short_description || project.description"
          />
        </div>
      </section>
      
      <StatsSection />
      
      <ServicesSection />
      

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