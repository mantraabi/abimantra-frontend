<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router' 
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const router = useRouter() 

const API_URL = 'https://api.abimantra.my.id/api'
const activeTab = ref('proyek') 

const projectForm = ref({ title: '', short_description: '', description: '', tech_stack: '', image_url: '', demo_url: '', gallery: '', is_featured: false })
const articleForm = ref({ title: '', category: '', excerpt: '', content: '', image_url: '' })

const projects = ref([])
const articles = ref([])
const isLoading = ref(false)

// State Edit Proyek
const isEditMode = ref(false);
const currentId = ref(null);

// STATE EDIT ARTIKEL BARU
const isEditArticleMode = ref(false);
const currentArticleId = ref(null);

const totalProjects = computed(() => projects.value.length)
const featuredProjects = computed(() => projects.value.filter(p => p.is_featured).length)
const totalArticles = computed(() => articles.value.length)

const handleLogout = () => {
  localStorage.removeItem('admin_token') 
  router.push('/login') 
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return { headers: { Authorization: `Bearer ${token}` } }
}

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

// 👉 FUNGSI PEMBERSIH DATA INPUT
const formatForInput = (data) => {
  if (!data) return '';
  if (Array.isArray(data)) return data.join(', ');
  
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      // Bersihkan jika masih ada kutip ekstra di dalam kata (misal: "\"Vue\"")
      return parsed.map(item => item.replace(/"/g, '')).join(', ');
    } else if (typeof parsed === 'string') {
      // Bersihkan jika dia string murni tapi bawa kurung siku
      return parsed.replace(/[\[\]"]/g, '').split(',').map(s => s.trim()).join(', ');
    }
  } catch (error) {
    // Fallback darurat
    return data.toString().replace(/[\[\]"]/g, '');
  }
  return '';
}

// ==============================
// LOGIKA PROYEK
// ==============================
const cancelEdit = () => {
  isEditMode.value = false;
  currentId.value = null;
  projectForm.value = { title: '', short_description: '', description: '', tech_stack: '', image_url: '', demo_url: '', gallery: '', is_featured: false };
}

const editProject = (project) => {
  isEditMode.value = true;
  currentId.value = project.id;
  activeTab.value = 'proyek';
  
  projectForm.value = {
    title: project.title,
    short_description: project.short_description || '',
    description: project.description,
    
    tech_stack: formatForInput(project.tech_stack),
    image_url: project.image_url,
    demo_url: project.demo_url,
    
    gallery: formatForInput(project.gallery),
    is_featured: project.is_featured
  };
};

const saveProject = async () => {
  try {
    const slug = projectForm.value.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const payload = { 
      ...projectForm.value, 
      slug,
      tech_stack: projectForm.value.tech_stack ? projectForm.value.tech_stack.split(',').map(s => s.trim()).join(', ') : '',
      gallery: projectForm.value.gallery ? projectForm.value.gallery.split(',').map(s => s.trim()).join(', ') : ''
    };

    if (isEditMode.value) {
      await axios.put(`${API_URL}/projects/${currentId.value}`, payload, getAuthHeaders());
      alert('Proyek berhasil diperbarui!');
    } else {
      await axios.post(`${API_URL}/projects`, payload, getAuthHeaders());
      alert('Proyek berhasil ditambahkan!');
    }
    cancelEdit(); 
    fetchData();  
  } catch (err) { handleError(err); }
};

// FUNGSI HAPUS PROYEK BARU
const deleteProject = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.')) {
    try {
      await axios.delete(`${API_URL}/projects/${id}`, getAuthHeaders());
      alert('Proyek berhasil dihapus!');
      fetchData();
    } catch (err) { handleError(err); }
  }
};

// ==============================
// LOGIKA ARTIKEL
// ==============================
const cancelArticleEdit = () => {
  isEditArticleMode.value = false;
  currentArticleId.value = null;
  articleForm.value = { title: '', category: '', excerpt: '', content: '', image_url: '' };
}

const editArticle = (article) => {
  isEditArticleMode.value = true;
  currentArticleId.value = article.id;
  activeTab.value = 'artikel';
  
  articleForm.value = {
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    content: article.content,
    image_url: article.image_url
  };
};

const saveArticle = async () => {
  try {
    const slug = articleForm.value.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const payload = {
      ...articleForm.value,
      slug,
      // Publish date hanya dibuat saat artikel baru dibuat (POST)
    }

    if (isEditArticleMode.value) {
      await axios.put(`${API_URL}/articles/${currentArticleId.value}`, payload, getAuthHeaders())
      alert('Artikel berhasil diperbarui!')
    } else {
      payload.publish_date = new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })
      await axios.post(`${API_URL}/articles`, payload, getAuthHeaders())
      alert('Artikel berhasil diterbitkan!')
    }
    
    cancelArticleEdit()
    fetchData()
  } catch (err) { handleError(err); }
}

// FUNGSI HAPUS ARTIKEL BARU
const deleteArticle = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
    try {
      await axios.delete(`${API_URL}/articles/${id}`, getAuthHeaders());
      alert('Artikel berhasil dihapus!');
      fetchData();
    } catch (err) { handleError(err); }
  }
};

// Fungsi bantuan untuk menangani error expired token
const handleError = (err) => {
  if(err.response?.status === 401 || err.response?.status === 403) {
      alert('Sesi Anda telah habis. Silakan login kembali.')
      handleLogout()
  } else {
      alert('Gagal memproses data: ' + (err.response?.data?.message || err.message)) 
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
        <button @click="activeTab = 'proyek'; cancelEdit();" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all', activeTab === 'proyek' ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-gray-400']">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Proyek
        </button>
        <button @click="activeTab = 'artikel'; cancelArticleEdit();" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all', activeTab === 'artikel' ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-gray-400']">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          Artikel
        </button>
      </nav>

      <div class="mt-auto space-y-3">
        <router-link to="/" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Kembali ke Web
        </router-link>
        
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2.5 rounded-lg transition-colors text-sm font-bold border border-red-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-6 md:p-12 overflow-y-auto">
      
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold text-brand-main">Dashboard Overview</h1>
          <p class="text-brand-muted text-sm">Kelola konten portofolio dan blog Anda di sini.</p>
        </div>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div class="bg-white p-6 rounded-3xl border border-brand-border shadow-sm flex items-center gap-5">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-brand-main flex items-center justify-center"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>
          <div><p class="text-sm font-bold text-brand-muted uppercase tracking-wider">Total Proyek</p><p class="text-3xl font-extrabold text-brand-main mt-1">{{ totalProjects }}</p></div>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-brand-border shadow-sm flex items-center gap-5">
          <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg></div>
          <div><p class="text-sm font-bold text-brand-muted uppercase tracking-wider">Proyek Utama</p><p class="text-3xl font-extrabold text-brand-main mt-1">{{ featuredProjects }}</p></div>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-brand-border shadow-sm flex items-center gap-5">
          <div class="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></div>
          <div><p class="text-sm font-bold text-brand-muted uppercase tracking-wider">Artikel Terbit</p><p class="text-3xl font-extrabold text-brand-main mt-1">{{ totalArticles }}</p></div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 space-y-6">
          <section class="bg-white rounded-3xl border border-brand-border shadow-sm p-8">
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2 text-brand-main">
              <span class="w-1.5 h-6 bg-brand-accent rounded-full"></span>
              <span v-if="activeTab === 'proyek'">{{ isEditMode ? 'Edit Proyek' : 'Tambah Proyek Baru' }}</span>
              <span v-else>{{ isEditArticleMode ? 'Edit Artikel' : 'Tulis Artikel Baru' }}</span>
            </h3>

            <form v-if="activeTab === 'proyek'" @submit.prevent="saveProject" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">Judul Proyek</label><input v-model="projectForm.title" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none" required></div>
                <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">Tech Stack (Koma)</label><input v-model="projectForm.tech_stack" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none"></div>
              </div>
              <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">Deskripsi Singkat</label><textarea v-model="projectForm.short_description" rows="2" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none"></textarea></div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">URL Gambar</label><input v-model="projectForm.image_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none"></div>
                <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">URL Demo</label><input v-model="projectForm.demo_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none"></div>
              </div>
              <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">Galeri (Koma)</label><textarea v-model="projectForm.gallery" rows="2" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none"></textarea></div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Deskripsi Lengkap</label>
                <div class="bg-white border border-brand-border rounded-xl overflow-hidden">
                  <QuillEditor 
                    theme="snow" 
                    v-model:content="projectForm.description" 
                    contentType="html" 
                    class="min-h-[250px] text-base"
                  />
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <input v-model="projectForm.is_featured" type="checkbox" id="is_featured" class="w-5 h-5 accent-brand-accent">
                <label for="is_featured" class="text-sm font-medium text-brand-main">Tampilkan di Hero Section</label>
              </div>

              <div class="flex gap-4">
                <button type="submit" class="flex-1 py-4 bg-brand-main text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg">{{ isEditMode ? 'Update Proyek' : 'Simpan Proyek' }}</button>
                <button v-if="isEditMode" type="button" @click="cancelEdit" class="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300">Batal</button>
              </div>
            </form>

            <form v-else @submit.prevent="saveArticle" class="space-y-5">
               <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">Judul Artikel</label><input v-model="articleForm.title" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none" required></div>
                <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">Kategori</label><input v-model="articleForm.category" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none"></div>
              </div>
              <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">URL Thumbnail</label><input v-model="articleForm.image_url" type="text" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none"></div>
              <div class="space-y-1.5"><label class="text-xs font-bold uppercase text-brand-muted">Ringkasan Pendek</label><textarea v-model="articleForm.excerpt" rows="2" class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 outline-none" required></textarea></div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase text-brand-muted">Konten Artikel</label>
                
                <div class="bg-white border border-brand-border rounded-xl overflow-hidden">
                  <QuillEditor 
                    theme="snow" 
                    v-model:content="articleForm.content" 
                    contentType="html" 
                    class="min-h-[300px] text-base"
                  />
                </div>
              </div>
              <div class="flex gap-4">
                <button type="submit" class="flex-1 py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-brand-hover shadow-lg transition-all">{{ isEditArticleMode ? 'Update Artikel' : 'Terbitkan Sekarang' }}</button>
                <button v-if="isEditArticleMode" type="button" @click="cancelArticleEdit" class="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300">Batal</button>
              </div>
            </form>
          </section>
        </div>

        <div class="space-y-6">
          <section class="bg-white rounded-3xl border border-brand-border shadow-sm p-6 overflow-hidden">
            <h3 class="text-sm font-bold uppercase tracking-widest text-brand-muted mb-4">Data Tersimpan</h3>
            
            <div v-if="isLoading" class="text-center py-10 text-xs text-brand-muted animate-pulse">Menghubungkan ke server...</div>
            
            <div v-else class="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              
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
                    <button @click="deleteProject(p.id)" class="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Hapus Proyek">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-else>
                <div v-for="a in articles" :key="a.id" class="p-3 border rounded-xl flex items-center justify-between group hover:bg-gray-50 transition-colors">
                  <div class="overflow-hidden">
                    <p class="text-sm font-bold text-brand-main truncate">{{ a.title }}</p>
                    <p class="text-[10px] text-brand-muted">{{ a.publish_date }}</p>
                  </div>
                  <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="editArticle(a)" class="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors" title="Edit Artikel">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button @click="deleteArticle(a.id)" class="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Hapus Artikel">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

      </div>
    </main>
  </div>
</template>