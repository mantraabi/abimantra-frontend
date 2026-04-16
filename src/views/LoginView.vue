<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username: username.value,
      password: password.value
    })
    
    // Jika sukses, simpan token ke localStorage browser
    localStorage.setItem('admin_token', response.data.token)
    
    // Pindahkan user ke halaman admin
    router.push('/admin')
  } catch (error) {
    // Tangkap pesan error dari backend (misal: "Password salah!")
    errorMessage.value = error.response?.data?.message || "Terjadi kesalahan saat login."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-brand-bg flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white rounded-3xl border border-brand-border shadow-xl p-8 md:p-10">
      
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold tracking-tight text-brand-main mb-2">
          abimantra<span class="text-brand-accent">.admin</span>
        </h1>
        <p class="text-brand-muted text-sm">Masuk untuk mengelola portofolio Anda.</p>
      </div>

      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div class="space-y-1.5">
          <label class="text-xs font-bold uppercase text-brand-muted">Username</label>
          <input 
            v-model="username" 
            type="text" 
            class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none transition-all" 
            required 
            placeholder="Masukkan username"
          >
        </div>
        
        <div class="space-y-1.5">
          <label class="text-xs font-bold uppercase text-brand-muted">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full bg-gray-50 border border-brand-border rounded-xl p-3 focus:ring-2 focus:ring-brand-accent outline-none transition-all" 
            required 
            placeholder="••••••••"
          >
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3.5 mt-4 bg-brand-main text-white font-bold rounded-xl hover:bg-black transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Memverifikasi...' : 'Masuk Dashboard' }}
        </button>
      </form>

      <div class="mt-8 text-center">
        <router-link to="/" class="text-sm font-medium text-brand-muted hover:text-brand-accent transition-colors flex items-center justify-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Halaman Depan
        </router-link>
      </div>

    </div>
  </div>
</template>