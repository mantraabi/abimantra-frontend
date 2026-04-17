<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // Tambahan untuk navigasi Logout
import axios from 'axios'

const router = useRouter() // Inisialisasi router

const API_URL = 'https://api.abimantra.my.id/api'
const activeTab = ref('proyek') // 'proyek' atau 'artikel'

// State untuk Form
const projectForm = ref({ title: '', description: '', tech_stack: '', image_url: '', demo_url: '', is_featured: false })
const articleForm = ref({ title: '', category: '', excerpt: '', content: '', image_url: '' })

// State untuk List Data
const projects = ref([])
const articles = ref([])
const isLoading = ref(false)

// 1. Fungsi Logout
const handleLogout = () => {
  localStorage.removeItem('admin_token') // Hapus token dari browser
  router.push('/login') // Kembali ke halaman login
}

// 2. Fungsi untuk mengambil Token saat mengirim data
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return { headers: { Authorization: `Bearer ${token}` } }
}

// Fungsi Ambil Data (Public, tidak butuh token)
const fetchData = async () => {
  isLoading.value = true
  try {
    const [pRes, aRes] = await Promise.all([
      axios.get(`${API_URL}/projects`),
      axios.get(`${API_URL}/articles`)
    ])
    projects.value = pRes.data
    articles.value = aRes.data
  } catch (err) {
    console.error("Gagal mengambil data", err)
  } finally {
    isLoading.value = false
  }
}

// simpan proyek baru (Dilindungi Token)
const saveProject = async () => {
  try {
    const slug = projectForm.value.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    
    const payload = { 
      ...projectForm.value, 
      slug: slug, // 👉 INI YANG KURANG! Tambahkan baris ini
      tech_stack: JSON.stringify(projectForm.value.tech_stack.split(',').map(s => s.trim())) 
    }
    
    // Sisipkan getAuthHeaders() agar backend mengizinkan akses
    await axios.post(`${API_URL}/projects`, payload, getAuthHeaders())
    
    alert('Proyek berhasil ditambahkan!')
    projectForm.value = { title: '', description: '', tech_stack: '', image_url: '', demo_url: '', is_featured: false }
    fetchData()
  } catch (err) { 
    // Deteksi jika token salah / kedaluwarsa
    if(err.response?.status === 401 || err.response?.status === 403) {
      alert('Sesi Anda telah habis. Silakan login kembali.')
      handleLogout()
    } else {
      alert('Gagal simpan proyek: ' + (err.response?.data?.error || err.message)) 
    }
  }
}

// Handler Terbit Artikel (Dilindungi Token)
const saveArticle = async () => {
  try {
    const slug = articleForm.value.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const payload = {
      ...articleForm.value,
      slug,
      publish_date: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })
    }
    // Sisipkan getAuthHeaders() agar backend mengizinkan akses
    await axios.post(`${API_URL}/articles`, payload, getAuthHeaders())
    
    alert('Artikel berhasil diterbitkan!')
    articleForm.value = { title: '', category: '', excerpt: '', content: '', image_url: '' }
    fetchData()
  } catch (err) { 
    // Deteksi jika token salah / kedaluwarsa
    if(err.response?.status === 401 || err.response?.status === 403) {
      alert('Sesi Anda telah habis. Silakan login kembali.')
      handleLogout()
    } else {
      alert('Gagal terbit artikel') 
    }
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="min-h-screen bg-[#f1f5f9] flex">
    
    <aside class="w-64 bg-brand-main text-white hidden md:flex flex-col p-6 sticky top-0 h-screen">
      <div class="mb-10">
        <h2 class="text-xl font-bold tracking-tight">abimantra<span class="text-brand-accent">.admin</span></h2>
      </div>
      
      <nav class="space-y-2 flex-1">
        <button 
          @click="activeTab = 'proyek'"
          :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all', activeTab === 'proyek' ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-gray-400']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Proyek
        </button>
        <button 
          @click="activeTab = 'artikel'"
          :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all', activeTab === 'artikel' ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-gray-400']"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Artikel
        </button>
      </nav>

      <div class="mt-auto space-y-3">
        <router-link to="/" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Web
        </router-link>
        
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2.5 rounded-lg transition-colors text-sm font-bold border border-red-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout System
        </button>
      </div>
    </aside>

    <main class="flex-1 p-6 md:p-12 overflow-y-auto">
      
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 class="text-2xl font-bold text-brand-main">
            {{ activeTab === 'proyek' ? 'Manajemen Proyek' : 'Manajemen Artikel' }}
          </h1>
          <p class="text-brand-muted text-sm">Kelola konten portofolio dan blog Anda di sini.</p>
        </div>
        <div class="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-brand-border shadow-sm">
          <div class="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-white font-bold text-sm">A</div>
          <div class="pr-4">
            <p class="text-xs font-bold text-brand-main leading-none">Abimantra Admin</p>
            <p class="text-[10px] text-brand-muted">Superuser</p>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 space-y-6">
          <section class="bg-white rounded-3xl border border-brand-border shadow-sm p-8">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2 text-brand-main">
              <span class="w-1.5 h-6 bg-brand-accent rounded-full"></span>
              {{ activeTab === 'proyek' ? 'Tambah Proyek Baru' : 'Tulis Artikel Baru' }}
            </h3>

            <form v-if="activeTab === 'proyek'" @submit.prevent="saveProject" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">Judul Proyek</label>
                  <input v-model="projectForm.title" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" required placeholder="CBT Sekolah">
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">Tech Stack (Koma)</label>
                  <input v-model="projectForm.tech_stack" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="Vue, Node.js, MySQL">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">URL Gambar Proyek</label>
                  <input v-model="projectForm.image_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="https://link-gambar.com/foto.jpg">
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">URL Demo (Live)</label>
                  <input v-model="projectForm.demo_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="https://cbt.abimantra.my.id">
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Deskripsi Lengkap</label>
                <textarea v-model="projectForm.description" rows="4" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-accent" required></textarea>
              </div>
              
              <div class="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <input v-model="projectForm.is_featured" type="checkbox" id="is_featured" class="w-5 h-5 accent-brand-accent">
                <label for="is_featured" class="text-sm font-medium text-brand-main">Tampilkan sebagai Proyek Utama (Hero Section)</label>
              </div>

              <button class="w-full py-4 bg-brand-main text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg">Simpan Proyek</button>
            </form>

            <form v-else @submit.prevent="saveArticle" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">Judul Artikel</label>
                  <input v-model="articleForm.title" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" required>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">Kategori</label>
                  <input v-model="articleForm.category" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="EdTech / Tutorial">
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">URL Thumbnail Artikel</label>
                <input v-model="articleForm.image_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="https://link-gambar.com/cover-artikel.jpg">
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Ringkasan Pendek</label>
                <textarea v-model="articleForm.excerpt" rows="2" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-accent" required></textarea>
              </div>
              
              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Konten Artikel</label>
                <textarea v-model="articleForm.content" rows="6" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Tulis inspirasi Anda di sini..." required></textarea>
              </div>
              
              <button class="w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-brand-hover transition-all shadow-lg">Terbitkan Sekarang</button>
            </form>
          </section>
        </div>

        <div class="space-y-6">
          <section class="bg-white rounded-3xl border border-brand-border shadow-sm p-6 overflow-hidden">
            <h3 class="text-sm font-bold uppercase tracking-widest text-brand-muted mb-4">Data Tersimpan</h3>
            
            <div v-if="isLoading" class="text-center py-10 text-xs text-brand-muted animate-pulse">Menghubungkan ke server...</div>
            
            <div v-else class="space-y-3">
              <div v-if="activeTab === 'proyek'">
                <div v-for="p in projects" :key="p.id" class="p-3 border rounded-xl flex items-center justify-between group hover:bg-gray-50">
                  <div class="overflow-hidden">
                    <p class="text-sm font-bold text-brand-main truncate">{{ p.title }}</p>
                    <p class="text-[10px] text-brand-muted italic">{{ p.is_featured ? 'Proyek Utama' : 'Portofolio' }}</p>
                  </div>
                  <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              </div>

              <div v-else>
                <div v-for="a in articles" :key="a.id" class="p-3 border rounded-xl flex items-center justify-between group hover:bg-gray-50">
                  <div class="overflow-hidden">
                    <p class="text-sm font-bold text-brand-main truncate">{{ a.title }}</p>
                    <p class="text-[10px] text-brand-muted">{{ a.publish_date }}</p>
                  </div>
                  <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              </div>

              <div v-if="(activeTab === 'proyek' && projects.length === 0) || (activeTab === 'artikel' && articles.length === 0)" class="text-center py-6">
                <p class="text-xs text-brand-muted italic">Database kosong.</p>
              </div>
            </div>
          </section>
        </div>

      </div>
    </main>
  </div>
</template>