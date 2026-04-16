<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// State untuk mendeteksi apakah layar sedang di-scroll
const isScrolled = ref(false)
// State untuk membuka/menutup menu di tampilan mobile
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-brand-border shadow-sm py-3' : 'bg-transparent py-5'}`"
  >
    <div class="max-w-[1000px] mx-auto px-6 flex justify-between items-center">
      
      <router-link to="/" class="text-xl font-bold tracking-tight text-brand-main flex items-center gap-1 group">
        <span class="bg-brand-main text-white px-2 py-0.5 rounded-md group-hover:bg-brand-accent transition-colors duration-300">
          abimantra
        </span>
        <span class="text-brand-accent">.my.id</span>
      </router-link>

      <nav class="hidden md:flex items-center gap-8">
        <a href="#proyek" class="text-[0.95rem] font-medium text-brand-muted hover:text-brand-accent transition-colors">Proyek</a>
        <a href="#artikel" class="text-[0.95rem] font-medium text-brand-muted hover:text-brand-accent transition-colors">Artikel</a>
        
        <a href="#kontak" class="bg-brand-main hover:bg-brand-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
          Kolaborasi
        </a>
      </nav>

      <button @click="toggleMobileMenu" class="md:hidden text-brand-main focus:outline-none p-1">
        <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div 
        v-show="isMobileMenuOpen" 
        class="md:hidden absolute top-full left-0 w-full bg-white border-b border-brand-border shadow-lg py-4 px-6 flex flex-col gap-4 origin-top"
      >
        <a href="#proyek" @click="isMobileMenuOpen = false" class="text-brand-main font-medium hover:text-brand-accent py-2 border-b border-brand-border/50">Proyek</a>
        <a href="#artikel" @click="isMobileMenuOpen = false" class="text-brand-main font-medium hover:text-brand-accent py-2 border-b border-brand-border/50">Artikel</a>
        <a href="#kontak" @click="isMobileMenuOpen = false" class="text-center bg-brand-main text-white px-5 py-3 rounded-lg text-sm font-semibold mt-2 active:bg-brand-accent">
          Kolaborasi
        </a>
      </div>
    </transition>
  </header>
</template>