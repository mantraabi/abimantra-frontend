<script setup>
import { onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'

onMounted(() => {
  window.scrollTo(0, 0)
  document.title = 'Layanan CBT Sekolah - Terima Beres | abimantra.my.id'
})

const packages = [
  {
    name: 'Paket Hemat',
    limit: 'Maks. 150 Siswa',
    price: 'Rp 450.000',
    period: '/ event',
    description: 'Sangat cocok untuk SD atau sekolah swasta kecil. Harga flat yang ekonomis namun tetap mendapatkan performa server mandiri.',
    features: [
      'Dedicated VPS (1 vCPU / 2GB RAM)',
      'Masa Aktif 30 Hari (1 Event)',
      'Subdomain Khusus (ujian.sekolah.id)',
      'Sistem Autosave & Anti-Nyontek',
      'Laporan Hasil & Analisis Soal',
      'Support Teknis via WA'
    ],
    isFeatured: false,
    link: 'https://t.me/mantraabi'
  },
  {
    name: 'Paket Standar',
    limit: '151 - 500 Siswa',
    price: 'Rp 2.500',
    period: '/ siswa',
    description: 'Pilihan paling populer. Memberikan keseimbangan antara kapasitas besar dan kestabilan tinggi untuk sekolah menengah.',
    features: [
      'Dedicated VPS (2 vCPU / 4GB RAM)',
      'Masa Aktif 30 Hari (1 Event)',
      'Subdomain Khusus (ujian.sekolah.id)',
      'Sistem Autosave & Anti-Nyontek',
      'Laporan Hasil & Analisis Soal',
      'Support Teknis via WA'
    ],
    isFeatured: true,
    link: 'https://t.me/mantraabi'
  },
  {
    name: 'Paket Profesional',
    limit: '> 500 Siswa',
    price: 'Rp 2.500',
    period: '/ siswa',
    description: 'Infrastruktur tangguh untuk sekolah besar. Menjamin kelancaran meski ratusan siswa mengerjakan ujian secara serentak.',
    features: [
      'Dedicated VPS (4 vCPU / 8GB RAM)',
      'Masa Aktif 30 Hari (1 Event)',
      'Subdomain Khusus (ujian.sekolah.id)',
      'Sistem Autosave & Anti-Nyontek',
      'Laporan Hasil & Analisis Soal',
      'Support Teknis via WA'
    ],
    isFeatured: false,
    link: 'https://t.me/mantraabi'
  }
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar />

    <section class="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white px-4">
      <div class="max-w-7xl mx-auto text-center">
        <span class="bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block">
          SaaS Khusus Pendidikan
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-brand-main mb-6 leading-tight">
          Ujian Digital Anti-Ngadat,<br> <span class="text-brand-accent">Satu Sekolah, Satu Server!</span>
        </h1>
        <p class="text-brand-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
          Berbeda dengan penyedia CBT lain yang mencampur ratusan sekolah di satu tempat, kami memberikan <strong>Dedicated VPS untuk setiap klien</strong>. Ujian dijamin lancar, data tidak bercampur, dan privasi 100% aman.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#harga" class="px-8 py-4 bg-brand-main text-white font-bold rounded-xl hover:bg-brand-accent transition-all shadow-lg shadow-blue-500/20">
            Lihat Pilihan Paket
          </a>
          <a href="https://t.me/mantraabi" target="_blank" class="px-8 py-4 bg-white text-brand-main border-2 border-brand-main/10 font-bold rounded-xl hover:bg-gray-50 transition-all">
            Konsultasi Kebutuhan
          </a>
        </div>
      </div>
    </section>

    <section id="harga" class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-brand-main mb-4">Investasi Per Event (UAS/UTS)</h2>
          <p class="text-brand-muted">Biaya transparan berdasarkan jumlah siswa. Jauh lebih hemat daripada biaya fotokopi kertas ujian.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="pkg in packages" :key="pkg.name" 
               :class="['p-8 rounded-3xl border transition-all duration-500 flex flex-col', 
                        pkg.isFeatured ? 'bg-brand-main text-white ring-4 ring-brand-accent/20 shadow-2xl md:scale-105 z-10' : 'bg-white border-brand-border hover:shadow-xl']">
            
            <h3 class="text-xl font-bold mb-1">{{ pkg.name }}</h3>
            <p :class="['text-sm font-bold uppercase tracking-wider mb-6', pkg.isFeatured ? 'text-brand-accent' : 'text-brand-accent']">
              {{ pkg.limit }}
            </p>
            
            <div class="mb-6 flex items-baseline">
              <span :class="['text-4xl font-black tracking-tight', pkg.isFeatured ? 'text-white' : 'text-brand-main']">{{ pkg.price }}</span>
              <span v-if="pkg.period" :class="['text-sm font-semibold ml-1', pkg.isFeatured ? 'text-blue-200' : 'text-gray-500']">{{ pkg.period }}</span>
            </div>

            <p :class="['text-sm mb-8 leading-relaxed', pkg.isFeatured ? 'text-blue-100' : 'text-brand-muted']">
              {{ pkg.description }}
            </p>

            <ul class="space-y-4 mb-10 flex-1">
              <li v-for="feat in pkg.features" :key="feat" class="flex items-center gap-3 text-sm font-medium">
                <svg class="w-5 h-5 shrink-0 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
                <span :class="pkg.isFeatured ? 'text-blue-50' : 'text-gray-600'">{{ feat }}</span>
              </li>
            </ul>

            <a :href="pkg.link" target="_blank"
               :class="['w-full py-4 text-center rounded-xl font-bold transition-all duration-300', 
                        pkg.isFeatured ? 'bg-brand-accent text-white hover:bg-blue-500 shadow-lg' : 'bg-blue-50 text-brand-main hover:bg-blue-100']">
              Pesan Sekarang
            </a>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-sm text-brand-muted max-w-3xl mx-auto flex items-start justify-center gap-2">
            <svg class="w-5 h-5 shrink-0 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-left">
              <strong>Catatan:</strong> Estimasi harga di atas dapat mengalami penyesuaian mengikuti fluktuasi biaya sewa infrastruktur Cloud Server global. Silakan hubungi kami untuk mendapatkan penawaran harga final (Quotation) yang mengikat untuk sekolah Anda.
            </span>
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-[#f8fafc] px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-extrabold text-brand-main mb-6 leading-tight">Mengapa Harus Sistem CBT Abimantra?</h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6 text-brand-main" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                </div>
                <div>
                  <h4 class="font-bold text-brand-main mb-1">Infrastruktur Terisolasi (Aman)</h4>
                  <p class="text-brand-muted text-sm leading-relaxed">Berkat model 1 Server 1 Sekolah, jika sekolah lain mengalami masalah jaringan, sekolah Anda tidak akan ikut terpengaruh.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6 text-brand-main" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <h4 class="font-bold text-brand-main mb-1">Keamanan Anti-Nyontek</h4>
                  <p class="text-brand-muted text-sm leading-relaxed">Sistem dilengkapi pendeteksi pergantian tab. Siswa tidak bisa membuka Google atau aplikasi lain saat ujian berlangsung.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                  <svg class="w-6 h-6 text-brand-main" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                </div>
                <div>
                  <h4 class="font-bold text-brand-main mb-1">Autosave Cerdas</h4>
                  <p class="text-brand-muted text-sm leading-relaxed">Jawaban siswa tersimpan otomatis secara real-time. Jika koneksi terputus atau HP mati, jawaban sebelumnya tidak akan hilang.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-brand-main rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
             <div class="relative z-10">
               <h3 class="text-2xl font-bold mb-4">Ingin Miliki Sistem Sendiri?</h3>
               <p class="text-blue-100 mb-8 leading-relaxed">Kami juga menyediakan opsi <strong>Lisensi Lifetime (Jual Putus)</strong> bagi sekolah yang sudah memiliki server mandiri dan ingin mengelola sistem sepenuhnya.</p>
               <ul class="space-y-4 mb-10">
                 <li class="flex items-center gap-3 text-sm font-medium"><svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg> Sekali Bayar Selamanya</li>
                 <li class="flex items-center gap-3 text-sm font-medium"><svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg> Instalasi di Server Sekolah</li>
                 <li class="flex items-center gap-3 text-sm font-medium"><svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg> Garansi Bug & Maintenance Awal</li>
               </ul>
               <a href="https://t.me/mantraabi" target="_blank" class="inline-block px-8 py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg">Hubungi untuk Penawaran</a>
             </div>
             <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-10 border-t border-brand-border mt-16 text-center text-brand-muted text-sm">
    <div class="max-w-[1000px] mx-auto px-6">
      <p>&copy; 2026 All rights reserved. <a href="https://abimantra.my.id" class="text-brand-main font-semibold hover:text-brand-accent transition-colors">abimantra.my.id</a></p>
    </div>
  </footer>
  </div>
</template>