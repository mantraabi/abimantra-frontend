<script setup>
import { onMounted } from 'vue'
import NavBar from '../components/Navbar.vue'

onMounted(() => {
  document.title = 'Halaman Tidak Ditemukan | abimantra.my.id'
})
</script>

<template>
  <NavBar />

  <main class="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 text-center pt-20">
    <h1 class="text-9xl font-black text-brand-main/10 tracking-tighter mb-4 select-none">
      404
    </h1>
    
    <h2 class="text-3xl md:text-4xl font-bold text-brand-main mb-4">
      Oops! Anda Tersesat
    </h2>
    
    <p class="text-brand-muted text-lg max-w-md mb-10">
      Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau Anda salah memasukkan URL.
    </p>

    <router-link to="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-main text-white font-bold rounded-xl hover:bg-brand-accent hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Kembali ke Beranda
    </router-link>
  </main>
</template>