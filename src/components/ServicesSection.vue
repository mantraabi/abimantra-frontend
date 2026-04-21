<script setup>
const services = [
  {
    title: 'PPDB Mandiri',
    price: 'Rp 350rb',
    period: '/ event',
    description: 'Digitalisasi pendaftaran siswa baru. Kelola ratusan berkas dokumen dan otomatisasi alur verifikasi panitia secara praktis.',
    features: [
      'Penyimpanan Dokumen Terpusat',
      'Cetak Kartu Peserta Otomatis',
      'Dedicated VPS (Ringan & Cepat)',
      'Server Aktif Penuh Selama PPDB'
    ],
    isPopular: false,
    buttonText: 'Konsultasi PPDB',
    buttonLink: 'https://t.me/mantraabi',
    isExternal: true
  },
  {
    title: 'CBT Sekolah',
    price: 'Mulai Rp 450rb',
    period: '/ event',
    description: 'Sewa sistem ujian digital per event. Kami menjamin performa maksimal dengan memberikan satu server VPS khusus untuk setiap sekolah.',
    features: [
      'Dedicated VPS (1 Server 1 Sekolah)',
      'Sistem Autosave & Anti-Nyontek',
      'Pilihan Paket Sesuai Jumlah Siswa',
      'Support Teknis Prioritas'
    ],
    isPopular: true,
    buttonText: 'Lihat Detail Paket',
    buttonLink: '/layanan/cbt',
    isExternal: false
  },
  {
    title: 'Sistem Kustom',
    price: 'Custom',
    period: '',
    description: 'Butuh E-Raport, Kasir SPP, atau Presensi Digital? Kami bangun sistem khusus yang menyesuaikan aturan dan SOP di sekolah Anda.',
    features: [
      'Analisis Kebutuhan Khusus',
      'Desain Interface Ramah Guru',
      'Pemeliharaan & Backup Rutin',
      'Hosting & Domain Terkelola'
    ],
    isPopular: false,
    buttonText: 'Diskusi Kebutuhan',
    buttonLink: 'https://t.me/mantraabi',
    isExternal: true
  }
]
</script>

<template>
  <div class="py-16 px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-extrabold text-brand-main mb-4 tracking-tight">Solusi Digitalisasi Sekolah</h2>
      <p class="text-brand-muted max-w-2xl mx-auto leading-relaxed">
        Layanan ekosistem aplikasi sekolah berbasis SaaS. Kami menjamin performa dengan memberikan <strong>satu server VPS khusus untuk setiap sekolah</strong> demi kelancaran dan keamanan data maksimal.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div v-for="(svc, idx) in services" :key="idx" 
           :class="['relative p-8 rounded-3xl border transition-all duration-300 flex flex-col', svc.isPopular ? 'bg-brand-main text-white shadow-2xl md:scale-105 border-brand-main z-10' : 'bg-white border-brand-border hover:border-brand-accent/50']">
        
        <div v-if="svc.isPopular" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
          Paling Direkomendasikan
        </div>

        <h3 :class="['text-2xl font-bold mb-3', svc.isPopular ? 'text-white' : 'text-brand-main']">{{ svc.title }}</h3>
        <p :class="['text-sm mb-8 min-h-[80px] leading-relaxed', svc.isPopular ? 'text-blue-100' : 'text-brand-muted']">{{ svc.description }}</p>
        
        <div class="mb-8 flex items-baseline">
          <span :class="['text-4xl font-black tracking-tight', svc.isPopular ? 'text-brand-accent' : 'text-brand-main']">{{ svc.price }}</span>
          <span v-if="svc.period" :class="['text-sm font-semibold ml-1', svc.isPopular ? 'text-blue-200' : 'text-gray-500']">{{ svc.period }}</span>
        </div>

        <ul class="space-y-4 mb-10 flex-1">
          <li v-for="(feat, fIdx) in svc.features" :key="fIdx" class="flex items-start gap-3 text-sm font-medium">
            <svg class="w-5 h-5 shrink-0 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
            <span :class="svc.isPopular ? 'text-blue-50' : 'text-gray-600'">{{ feat }}</span>
          </li>
        </ul>

        <template v-if="svc.isExternal">
          <a :href="svc.buttonLink" target="_blank" 
             :class="['w-full py-4 text-center rounded-xl font-bold transition-all duration-300', svc.isPopular ? 'bg-brand-accent text-white hover:bg-blue-500 shadow-lg' : 'bg-blue-50 text-brand-main hover:bg-blue-100']">
            {{ svc.buttonText }}
          </a>
        </template>
        <template v-else>
          <router-link :to="svc.buttonLink" 
             :class="['w-full py-4 text-center rounded-xl font-bold transition-all duration-300', svc.isPopular ? 'bg-brand-accent text-white hover:bg-blue-500 shadow-lg' : 'bg-blue-50 text-brand-main hover:bg-blue-100']">
            {{ svc.buttonText }}
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>