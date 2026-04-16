<script setup>
defineProps({
  badge: String,
  title: String,
  description: String,
  techStack: Array,
  imageUrl: String, // Prop baru untuk gambar
  demoUrl: String   // Prop baru untuk link live demo
})
</script>

<template>
  <div class="bg-brand-card border border-brand-border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative group flex flex-col lg:flex-row">
    
    <div v-if="imageUrl" class="lg:w-[45%] relative overflow-hidden bg-gray-100 border-r border-brand-border/50">
      <img 
        :src="imageUrl" 
        :alt="`Tangkapan layar dari aplikasi ${title}`" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[250px] lg:min-h-full"
      />
    </div>

    <div :class="['relative p-8 md:p-12 flex flex-col justify-center', imageUrl ? 'lg:w-[55%]' : 'w-full']">
      
      <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzRDREUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIWMjB6TTAgMjBoMjB2MjBIMFYyMHoyMCAwaDIwdjIwSDIwVjB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 -z-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-500"></div>

      <div class="relative z-10">
        
        <span v-if="badge" class="inline-flex items-center gap-2 bg-blue-50 text-brand-accent px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-blue-100 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ badge }}
        </span>
        
        <h3 class="text-3xl md:text-4xl font-extrabold text-brand-main tracking-tight mb-4 group-hover:text-brand-accent transition-colors duration-300">
          {{ title }}
        </h3>
        
        <p class="text-lg text-brand-muted max-w-[750px] mb-8 leading-relaxed">
          {{ description }}
        </p>
        
        <div v-if="techStack && techStack.length" class="flex gap-3 flex-wrap mb-10 border-t border-brand-border/60 pt-8">
          <span v-for="(tech, index) in techStack" :key="index" class="text-xs font-semibold text-brand-main/70 bg-brand-bg border border-brand-border px-4 py-1.5 rounded-lg group-hover:border-brand-accent/30 transition-colors duration-300">
            {{ tech }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-4 mt-auto">
          
          <a v-if="demoUrl" :href="demoUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-main text-white text-sm font-semibold hover:bg-brand-accent hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-lg">
            Coba Demo Live
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a href="#kontak" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:text-brand-hover transition-colors">
            Ajukan Pemasangan
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </div>
    
  </div>
</template>