<script setup>
defineProps({
  title: String,
  description: String
})
</script>

<template>
  <div class="bg-brand-card border border-brand-border rounded-2xl p-7 h-full flex flex-col transition-all duration-300 hover:border-brand-accent/40 hover:shadow-xl hover:-translate-y-1 group">
    
    <div class="w-10 h-10 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:border-brand-accent/30 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-muted group-hover:text-brand-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>

    <h4 class="text-xl font-bold text-brand-main mb-3 group-hover:text-brand-accent transition-colors">
      {{ title }}
    </h4>
    
    <p class="text-[0.95rem] text-brand-muted leading-relaxed mb-6">
      {{ description }}
    </p>

    <div class="mt-auto flex items-center text-sm font-semibold text-brand-main/60 group-hover:text-brand-accent transition-colors">
      Detail Proyek
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>