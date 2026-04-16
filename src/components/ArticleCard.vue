<script setup>
defineProps({
  date: String,
  category: String,
  title: String,
  description: String,
  imageUrl: String, // Prop baru untuk link thumbnail artikel
  link: {
    type: String,
    default: '#'
  }
})
</script>

<template>
  <router-link :to="link" class="group flex flex-col sm:flex-row gap-5 md:gap-6 p-5 md:p-6 bg-brand-card border border-brand-border rounded-2xl hover:border-brand-accent/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    
    <div v-if="imageUrl" class="sm:w-48 md:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-brand-border/50 relative">
      <img 
        :src="imageUrl" 
        :alt="`Thumbnail artikel: ${title}`" 
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>

    <div class="flex-1 flex flex-col justify-center">
      
      <div class="flex items-center gap-3 mb-3">
        <span class="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-accent px-2.5 py-1 rounded-md border border-blue-100">
          {{ category }}
        </span>
        <span class="text-xs sm:text-sm text-brand-muted flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ date }}
        </span>
      </div>

      <h3 class="text-xl md:text-2xl font-bold text-brand-main mb-2 group-hover:text-brand-accent transition-colors duration-300 leading-tight">
        {{ title }}
      </h3>

      <p class="text-brand-muted leading-relaxed mb-5 line-clamp-2 text-sm md:text-base">
        {{ description }}
      </p>

      <div class="mt-auto flex items-center text-sm font-semibold text-brand-main group-hover:text-brand-accent transition-colors">
        Baca selengkapnya
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

    </div>

  </router-link>
</template>