<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: "Apakah sekolah kami harus memiliki tim IT khusus?",
    answer: "Tidak perlu. Jika Anda memilih 'Paket Terima Beres', semua urusan infrastruktur, server, keamanan, hingga domain akan kami kelola sepenuhnya. Anda tinggal terima akses login.",
    isOpen: false
  },
  {
    question: "Untuk alamat website (domain) menggunakan apa?",
    answer: "Khusus Paket Terima Beres, kami menyediakan subdomain gratis (contoh: sekolahanda.abimantra.my.id). Namun, jika sekolah sudah memiliki domain resmi .sch.id sendiri, kami juga bisa membantu menghubungkannya ke sistem kami.",
    isOpen: false
  },
  {
    question: "Berapa lama proses pemasangan sistem ini?",
    answer: "Untuk Jasa Instalasi maupun Paket Terima Beres, sistem biasanya sudah siap digunakan secara online dalam waktu 1-2 x 24 jam kerja setelah semua data sekolah kami terima.",
    isOpen: false
  },
  {
    question: "Apa bedanya beli 'Source Code' dengan paket lainnya?",
    answer: "Membeli Source Code berarti Anda mendapatkan file mentah aplikasi. Ini cocok jika sekolah ingin mengembangkan fitur sendiri. Namun, kami tidak memberikan bantuan teknis pemasangan server untuk paket ini.",
    isOpen: false
  },
  {
    question: "Bagaimana jika terjadi kendala saat pelaksanaan ujian?",
    answer: "Kami memberikan bantuan teknis prioritas. Khusus pengguna Paket Terima Beres, kami melakukan monitoring server secara intensif selama masa ujian untuk menjamin kelancaran sistem Anda.",
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value.forEach((faq, i) => {
    if (i === index) {
      faq.isOpen = !faq.isOpen
    } else {
      faq.isOpen = false
    }
  })
}
</script>

<template>
  <section class="py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-extrabold text-brand-main mb-4">Pertanyaan Umum</h2>
      <p class="text-brand-muted max-w-2xl mx-auto">Jawaban singkat untuk keraguan Anda sebelum memulai kerja sama dengan kami.</p>
    </div>

    <div class="max-w-3xl mx-auto space-y-4">
      <div v-for="(faq, idx) in faqs" :key="idx" 
           class="bg-white border border-brand-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-accent/50 shadow-sm">
        
        <button @click="toggleFaq(idx)" class="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none">
          <span :class="['font-bold text-base md:text-lg', faq.isOpen ? 'text-brand-accent' : 'text-brand-main']">
            {{ faq.question }}
          </span>
          
          <span :class="['shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors', faq.isOpen ? 'bg-brand-accent/10 text-brand-accent' : 'bg-gray-50 text-brand-muted']">
            <svg v-if="!faq.isOpen" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </span>
        </button>

        <div v-show="faq.isOpen" class="px-6 pb-6 text-brand-muted text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4 animate-fade-in">
          {{ faq.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>