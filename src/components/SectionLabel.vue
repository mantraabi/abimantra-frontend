<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex justify-between items-end mb-8 border-b border-brand-border/50 pb-2">
    <h2 class="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-brand-main">
      {{ title }}
    </h2>
  </div>
</template>