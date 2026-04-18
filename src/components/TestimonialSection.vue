<script setup>
import { ref, computed } from 'vue'

const testimonials = [
  {
    content: "Sistem CBT dari Abimantra sangat stabil. Kami berhasil melaksanakan ujian sekolah untuk 500+ siswa secara serentak tanpa kendala server.",
    author: "Kepala Sekolah",
    institution: "SMP Negeri 1 Konoha",
    image: "https://ui-avatars.com/api/?name=Kepala+Sekolah&background=0D8ABC&color=fff"
  },
  {
    content: "Fitur PPDB Mandiri sangat memudahkan panitia dalam memverifikasi berkas pendaftar. Sistemnya ringan dan user-friendly bahkan untuk orang tua siswa.",
    author: "Ketua Panitia PPDB",
    institution: "SMA Merdeka Belajar",
    image: "https://ui-avatars.com/api/?name=Panitia+PPDB&background=2563eb&color=fff"
  },
  {
    content: "Pelayanan sangat cepat dan ramah. ServerManaged-nya benar-benar membebaskan kami dari urusan teknis server. Highly recommended!",
    author: "Wakasek Sarpras",
    institution: "SMK Tunas Harapan",
    image: "https://ui-avatars.com/api/?name=Sarpras+Tunas&background=green&color=fff"
  }
]

// Logika Navigasi Slider
const sliderRef = ref(null)
const currentIndex = ref(0)
const totalItems = testimonials.length

const scrollSlider = (direction) => {
  const container = sliderRef.value
  const cardWidth = container.querySelector('.testi-card').offsetWidth + 24 // Lebar kartu + gap
  
  if (direction === 'next') {
    container.scrollLeft += cardWidth
  } else {
    container.scrollLeft -= cardWidth
  }
}

// Update index aktif saat discroll (opsional, untuk indikator dot)
const handleScroll = (event) => {
  const container = event.target
  const cardWidth = container.querySelector('.testi-card').offsetWidth + 24
  currentIndex.value = Math.round(container.scrollLeft / cardWidth)
}
</script>

<template>
  <section class="py-16">
    <div class="flex items-center justify-between mb-10 gap-4">
      <div>
        <h2 class="text-3xl font-extrabold text-brand-main mb-2">Suara Mitra Kami</h2>
        <p class="text-brand-muted text-sm max-w-xl">Kepuasan dan kelancaran operasional sekolah adalah prioritas utama Kami.</p>
      </div>
      
      <div class="hidden md:flex gap-2 shrink-0">
        <button @click="scrollSlider('prev')" class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-brand-border text-brand-main hover:bg-blue-50 hover:border-blue-100 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button @click="scrollSlider('next')" class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-brand-border text-brand-main hover:bg-blue-50 hover:border-blue-100 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>

    <div ref="sliderRef" @scroll="handleScroll" class="slider-container flex gap-6 overflow-x-auto pb-4 -mb-4 focus:outline-none">
      
      <div v-for="(testi, idx) in testimonials" :key="idx" 
           class="testi-card shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%] bg-white p-6 rounded-3xl border border-brand-border shadow-sm flex flex-col justify-between group transition-all hover:border-brand-accent/30 hover:shadow-md">
        
        <div class="relative">
          <div class="text-brand-accent/20 absolute -top-1 -left-2 group-hover:text-brand-accent/40 transition-colors">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3H21.017V15C21.017 18.3137 18.3241 21 15.017 21H14.017ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709C8.56937 16 9.01709 15.5523 9.01709 15V9C9.01709 8.44772 8.56937 8 8.01709 8H5.01709C3.91252 8 3.01709 7.10457 3.01709 6V3H10.0171V15C10.0171 18.3137 7.3242 21 4.01709 21H3.01709Z"/></svg>
          </div>
          <p class="text-sm text-brand-main leading-relaxed mb-6 font-medium italic relative z-10 pl-6 pt-2 min-h-[80px]">
            "{{ testi.content }}"
          </p>
        </div>

        <div class="flex items-center gap-3 border-t border-brand-border pt-5">
          <img :src="testi.image" :alt="testi.author" class="w-10 h-10 rounded-full border border-gray-100">
          <div>
            <h4 class="font-bold text-brand-main text-sm leading-tight">{{ testi.author }}</h4>
            <p class="text-[11px] text-brand-muted font-semibold uppercase tracking-wider">{{ testi.institution }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* MAGIC CSS FOR SMOOTH SCROLL & SNAP */
.slider-container {
  /* Hilangkan scrollbar di berbagai browser */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  
  /* Aktifkan efek snap saat berhenti scroll */
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth; /* Animasi geser mulus saat tombol ditekan */
}

.slider-container::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.testi-card {
  /* Beritahu kartu untuk "nge-snap" ke kiri kontainer */
  scroll-snap-align: start;
}
</style>