<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' 
import axios from 'axios'

const router = useRouter() 

const API_URL = 'https://api.abimantra.my.id/api'
const activeTab = ref('proyek') 

// State untuk Form (Sudah ditambahkan short_description dan gallery)
const projectForm = ref({ title: '', short_description: '', description: '', tech_stack: '', image_url: '', demo_url: '', gallery: '', is_featured: false })
const articleForm = ref({ title: '', category: '', excerpt: '', content: '', image_url: '' })

// State untuk List Data
const projects = ref([])
const articles = ref([])
const isLoading = ref(false)

// State untuk Mode Edit
const isEditMode = ref(false);
const currentId = ref(null);

// 1. Fungsi Logout
const handleLogout = () => {
  localStorage.removeItem('admin_token') 
  router.push('/login') 
}

// 2. Fungsi Token
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return { headers: { Authorization: `Bearer ${token}` } }
}

// Fungsi Ambil Data 
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

// Fungsi Batal Edit
const cancelEdit = () => {
  isEditMode.value = false;
  currentId.value = null;
  projectForm.value = { title: '', short_description: '', description: '', tech_stack: '', image_url: '', demo_url: '', gallery: '', is_featured: false };
}

// Fungsi Tarik Data ke Form (Saat Tombol Edit Ditekan)
const editProject = (project) => {
  isEditMode.value = true;
  currentId.value = project.id;
  activeTab.value = 'proyek';
  
  // Isi form dengan data yang ada
  projectForm.value = {
    title: project.title,
    short_description: project.short_description || '',
    description: project.description,
    tech_stack: Array.isArray(JSON.parse(project.tech_stack)) ? JSON.parse(project.tech_stack).join(', ') : project.tech_stack,
    image_url: project.image_url,
    demo_url: project.demo_url,
    gallery: project.gallery ? JSON.parse(project.gallery).join(', ') : '',
    is_featured: project.is_featured
  };
};

// Fungsi Simpan (Buat Baru ATAU Update)
const saveProject = async () => {
  try {
    const slug = projectForm.value.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const payload = { 
      ...projectForm.value, 
      slug,
      tech_stack: JSON.stringify(projectForm.value.tech_stack ? projectForm.value.tech_stack.split(',').map(s => s.trim()) : []),
      gallery: JSON.stringify(projectForm.value.gallery ? projectForm.value.gallery.split(',').map(s => s.trim()) : [])
    };

    if (isEditMode.value) {
      await axios.put(`${API_URL}/projects/${currentId.value}`, payload, getAuthHeaders());
      alert('Proyek berhasil diperbarui!');
    } else {
      await axios.post(`${API_URL}/projects`, payload, getAuthHeaders());
      alert('Proyek berhasil ditambahkan!');
    }

    cancelEdit(); // Reset form setelah sukses
    fetchData();  // Refresh data
  } catch (err) { 
    if(err.response?.status === 401 || err.response?.status === 403) {
      alert('Sesi Anda telah habis. Silakan login kembali.')
      handleLogout()
    } else {
      alert('Gagal simpan data: ' + (err.response?.data?.error || err.message)) 
    }
  }
};

// Handler Terbit Artikel 
const saveArticle = async () => {
  try {
    const slug = articleForm.value.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const payload = {
      ...articleForm.value,
      slug,
      publish_date: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })
    }
    await axios.post(`${API_URL}/articles`, payload, getAuthHeaders())
    
    alert('Artikel berhasil diterbitkan!')
    articleForm.value = { title: '', category: '', excerpt: '', content: '', image_url: '' }
    fetchData()
  } catch (err) { 
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
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 space-y-6">
          <section class="bg-white rounded-3xl border border-brand-border shadow-sm p-8">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2 text-brand-main">
              <span class="w-1.5 h-6 bg-brand-accent rounded-full"></span>
              {{ activeTab === 'proyek' ? (isEditMode ? 'Edit Proyek' : 'Tambah Proyek Baru') : 'Tulis Artikel Baru' }}
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

              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Deskripsi Singkat (Maks 160 Karakter)</label>
                <textarea v-model="projectForm.short_description" rows="2" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-accent" placeholder="Platform ujian modern..."></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">URL Gambar Sampul</label>
                  <input v-model="projectForm.image_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="https://link.com/foto.jpg">
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase text-brand-muted">URL Demo (Live)</label>
                  <input v-model="projectForm.demo_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none" placeholder="https://cbt.abimantra.my.id">
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Galeri Gambar (Pisahkan dengan koma)</label>
                <textarea v-model="projectForm.gallery" rows="2" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-accent" placeholder="https://img1.jpg, https://img2.jpg"></textarea>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Deskripsi Lengkap (Cerita / Studi Kasus)</label>
                <textarea v-model="projectForm.description" rows="4" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none focus:ring-2 focus:ring-brand-accent" required></textarea>
              </div>
              
              <div class="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <input v-model="projectForm.is_featured" type="checkbox" id="is_featured" class="w-5 h-5 accent-brand-accent">
                <label for="is_featured" class="text-sm font-medium text-brand-main">Tampilkan sebagai Proyek Utama (Hero Section)</label>
              </div>

              <div class="flex gap-4">
                <button type="submit" class="flex-1 py-4 bg-brand-main text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg">
                  {{ isEditMode ? 'Update Proyek' : 'Simpan Proyek' }}
                </button>
                <button v-if="isEditMode" type="button" @click="cancelEdit" class="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all">
                  Batal
                </button>
              </div>
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
                <div v-for="p in projects" :key="p.id" class="p-3 border rounded-xl flex items-center justify-between group hover:bg-gray-50 transition-colors">
                  <div class="overflow-hidden">
                    <p class="text-sm font-bold text-brand-main truncate">{{ p.title }}</p>
                    <p class="text-[10px] text-brand-muted italic">{{ p.is_featured ? 'Proyek Utama' : 'Portofolio' }}</p>
                  </div>
                  <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="editProject(p)" class="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors" title="Edit Proyek">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button class="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Hapus Proyek">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
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