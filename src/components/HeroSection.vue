<script setup>
</script>

<template>
  <section class="relative pt-[140px] pb-20 md:pt-[180px] md:pb-32 overflow-hidden">
    
    <div class="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

    <div class="max-w-[800px] relative z-10">
      
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand-accent text-sm font-semibold mb-6">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
        </span>
        Terbuka untuk kolaborasi
      </div>

      <h1 class="text-4xl md:text-6xl font-extrabold text-brand-main leading-[1.15] tracking-tight mb-6">
        Membangun masa depan <br class="hidden md:block" />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-emerald-500">
          Sistem Digital Sekolah.
        </span>
      </h1>

      <p class="text-lg md:text-xl text-brand-muted mb-10 max-w-2xl leading-relaxed">
         Saya seorang pengembang web yang berfokus pada ekosistem pendidikan.
          Membangun aplikasi yang memudahkan operasional sekolah dengan teknologi
          terkini, mulai dari sistem ujian digital hingga manajemen data siswa.
      </p>

      <div class="flex flex-wrap items-center gap-4">
        <a href="#proyek" class="px-7 py-3.5 rounded-xl bg-brand-main text-white font-medium hover:bg-brand-accent hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg">
          Lihat Portofolio
        </a>
        <a href="#artikel" class="px-7 py-3.5 rounded-xl bg-white border border-brand-border text-brand-main font-medium hover:border-brand-accent hover:text-brand-accent transition-all duration-300">
          Baca Catatan Dev
        </a>
      </div>
      
      <div class="mt-16 pt-8 border-t border-brand-border/60 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-brand-muted">
        <span class="font-medium">Tech Stack Favorit:</span>
        <div class="flex gap-4 font-semibold text-brand-main/70">
          <span class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-[#41b883]"></span> Vue.js
          </span>
          <span class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-[#339933]"></span> Node.js
          </span>
          <span class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-[#4479A1]"></span> MySQL
          </span>
        </div>
      </div>

    </div>
  </section>
</template>