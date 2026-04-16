<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Import Komponen
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import SectionLabel from '../components/SectionLabel.vue'
import FeaturedProject from '../components/FeaturedProject.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import ContactSection from '../components/ContactSection.vue'

// State Data
const featuredProject = ref(null)
const otherProjects = ref([])
const articles = ref([])
const isLoading = ref(true)

const API_URL = 'http://localhost:3000/api'

// Fetch Data
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
    console.error("Gagal mengambil data dari backend:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
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
          :description="featuredProject.description"
          :techStack="featuredProject.tech_stack ? JSON.parse(featuredProject.tech_stack) : []"
          :imageUrl="featuredProject.image_url"  :demoUrl="featuredProject.demo_url"    />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <ProjectCard 
            v-for="project in otherProjects" 
            :key="project.id"
            :title="project.title"
            :description="project.description"
          />
          
        </div>
      </section>

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
            :imageUrl="article.image_url" :link="`/artikel/${article.slug}`"
          />
        </div>
      </section>
    </div>

    <ContactSection />
  </main>

  <footer class="py-10 border-t border-brand-border mt-16 text-center text-brand-muted text-sm">
    <div class="max-w-[1000px] mx-auto px-6">
      <p>&copy; 2026 abimantra.my.id. Dibangun dengan Node.js & Vue + Tailwind CSS.</p>
    </div>
  </footer>
</template>