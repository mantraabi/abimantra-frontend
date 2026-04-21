<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: "Apakah sekolah harus menyiapkan server dan tim IT sendiri?",
    answer: "Sama sekali tidak. Sistem kami berbasis Cloud SaaS (Terima Beres). Kami yang menyediakan Dedicated VPS, mengatur konfigurasi keamanan, dan merawat servernya. Pihak sekolah hanya perlu menyiapkan soal ujian dan siswa tinggal login menggunakan HP/Laptop masing-masing.",
    isOpen: false
  },
  {
    question: "Apa maksud dari skema pembayaran sewa 'Per Event'?",
    answer: "Sistem Per Event berarti sekolah hanya membayar saat sedang ada kegiatan saja (misalnya masa PPDB atau musim ujian UTS/UAS). Masa aktif server adalah 30 hari. Ini sangat menghemat anggaran karena Anda tidak perlu membayar biaya langganan bulanan di saat aplikasi sedang tidak dipakai.",
    isOpen: false
  },
  {
    question: "Apakah server dijamin tidak akan down saat ujian serentak?",
    answer: "Kami menerapkan arsitektur '1 Sekolah 1 Server (VPS)'. Artinya, beban trafik dan data sekolah Anda tidak dicampur dengan sekolah lain. Hal ini menjamin performa yang jauh lebih stabil dan anti-lag meskipun ratusan siswa Anda login dan menekan tombol di detik yang sama.",
    isOpen: false
  },
  {
    question: "Untuk alamat website (domain) menggunakan apa?",
    answer: "Kami menyediakan subdomain khusus secara gratis untuk setiap sekolah (contoh: ujian.smpn1.id). Namun, jika sekolah Anda sudah memiliki domain resmi .sch.id sendiri, kami akan dengan senang hati membantu menghubungkannya ke sistem tanpa biaya tambahan.",
    isOpen: false
  },
  {
    question: "Bagaimana jika ada masalah teknis di tengah pelaksanaan ujian?",
    answer: "Kami memberikan pendampingan teknis (standby support) prioritas via WhatsApp selama hari-H pelaksanaan ujian. Tim kami akan terus memantau beban memori server Anda dari belakang layar untuk memastikan ujian berjalan tanpa hambatan.",
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

    <div class="max-w-3xl mx-auto space-y-4 px-4">
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