<script setup>
const services = [
  {
    title: 'Source Code',
    price: 'Rp 150k',
    period: '/ aplikasi',
    description: 'Dapatkan akses penuh ke kode sumber aplikasi. Ideal bagi Anda yang ingin mempelajari struktur kode atau mengelola sistem secara mandiri.',
    features: ['Akses Full Source Code', 'Lisensi Penggunaan Mandiri', 'Struktur Kode Rapih (Vue/Node)', 'Update Versi Terbaru'],
    isPopular: false,
    buttonText: 'Beli Source Code',
    buttonLink: 'https://t.me/mantraabi'
  },
  {
    title: 'Instalasi & Setup',
    price: 'Rp 500k',
    period: '/ pemasangan',
    description: 'Terima beres. Saya bantu pasangkan di server (VPS) sekolah Anda hingga aplikasi siap digunakan oleh guru dan siswa.',
    features: ['Setup VPS & aaPanel', 'Instalasi Aplikasi', 'Konfigurasi Domain/Subdomain', 'Training Admin'],
    isPopular: true,
    buttonText: 'Pesan Sekarang',
    buttonLink: 'https://t.me/mantraabi'
  },
  {
    title: 'Managed Server',
    price: 'Mulai Rp 250k',
    period: '/ bulan',
    description: 'Sekolah tidak perlu repot sewa server. Semua infrastruktur, maintenance, dan keamanan Saya yang urus sepenuhnya.',
    features: ['Termasuk Cloud VPS', 'Backup Database Rutin', 'Prioritas Bantuan Teknis', 'Gratis Update Aplikasi'],
    isPopular: false,
    buttonText: 'Konsultasi Dulu',
    buttonLink: 'https://t.me/mantraabi'
  }
]
</script>

<template>
  <div class="py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-extrabold text-brand-main mb-4">Layanan & Kolaborasi</h2>
      <p class="text-brand-muted max-w-2xl mx-auto">Pilih paket layanan yang paling sesuai dengan kebutuhan instansi Anda. Saya hadir untuk membantu digitalisasi sekolah Anda.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(svc, idx) in services" :key="idx" 
           :class="['relative p-8 rounded-3xl border transition-all duration-300 flex flex-col', svc.isPopular ? 'bg-brand-main text-white shadow-2xl scale-105 border-brand-main z-10' : 'bg-white border-brand-border hover:border-brand-accent/50']">
        
        <div v-if="svc.isPopular" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Paling Diminati
        </div>

        <h3 :class="['text-xl font-bold mb-2', svc.isPopular ? 'text-white' : 'text-brand-main']">{{ svc.title }}</h3>
        <p :class="['text-sm mb-6 min-h-[60px]', svc.isPopular ? 'text-blue-100' : 'text-brand-muted']">{{ svc.description }}</p>
        
        <div class="mb-8">
          <span :class="['text-4xl font-extrabold', svc.isPopular ? 'text-brand-accent' : 'text-brand-main']">{{ svc.price }}</span>
          <span v-if="svc.period" :class="['text-sm font-medium ml-1', svc.isPopular ? 'text-blue-200' : 'text-gray-500']">{{ svc.period }}</span>
        </div>

        <ul class="space-y-4 mb-10 flex-1">
          <li v-for="(feat, fIdx) in svc.features" :key="fIdx" class="flex items-start gap-3 text-sm">
            <svg class="w-5 h-5 shrink-0 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span :class="svc.isPopular ? 'text-blue-50' : 'text-gray-600'">{{ feat }}</span>
          </li>
        </ul>

        <a :href="svc.buttonLink" target="_blank" 
           :class="['w-full py-4 text-center rounded-xl font-bold transition-colors', svc.isPopular ? 'bg-brand-accent text-white hover:bg-blue-500' : 'bg-blue-50 text-brand-main hover:bg-blue-100']">
          {{ svc.buttonText }}
        </a>
      </div>
    </div>
  </div>
</template>