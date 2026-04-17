<script setup>
const stats = [
  { value: '2', label: 'Sekolah Perintis' },
  { value: '100%', label: 'Dukungan Teknis' },
  { value: 'Modern', label: 'Teknologi Stack' },
  { value: 'Secure', label: 'Sistem Teruji' }
]
</script>

<template>
  <div class="bg-brand-main text-white rounded-3xl p-8 md:p-12 my-10 shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-brand-accent rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
    
    <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="md:w-1/2 text-center md:text-left">
        <h3 class="text-2xl md:text-3xl font-bold mb-3">Membangun Kepercayaan, Satu Sekolah Sekaligus</h3>
        <p class="text-blue-100 text-sm leading-relaxed">
          Kami sedang memulai perjalanan untuk mendigitalisasi sekolah di Indonesia. Fokus kami saat ini adalah memberikan kualitas layanan terbaik dan dukungan penuh bagi setiap mitra perintis kami.
        </p>
      </div>
      
      <div class="md:w-1/2 grid grid-cols-2 gap-6 w-full">
        <div v-for="(stat, index) in stats" :key="index" class="text-center bg-white/5 p-4 rounded-2xl border border-white/10">
          <p class="text-3xl md:text-4xl font-extrabold text-brand-accent mb-1">{{ stat.value }}</p>
          <p class="text-[10px] font-bold uppercase tracking-widest text-blue-200">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>