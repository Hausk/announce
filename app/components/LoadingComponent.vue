<!-- components/LoadingComponent.vue -->
<template>
  <div class="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center">
    <div class="loading-container relative">
      <h1 class="text-4xl md:text-6xl font-bold text-white opacity-100">
        CHARGEMENT
      </h1>

      <div
        ref="progressBar"
        class="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-8"
      >
        <div
          class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <div class="flex gap-2 mt-4 justify-center">
        <div
          v-for="i in 3"
          :key="i"
          :ref="el => dots[i-1] = el"
          class="w-2 h-2 rounded-full bg-white"
          :class="`dot-${i}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const progressBar = ref(null)
const dots = ref([])

defineProps({
  progress: {
    type: Number,
    default: 0
  }
})

onMounted(() => {
  // Animation continue des points
  dots.value.forEach((dot, index) => {
    gsap.to(dot, {
      y: -10,
      duration: 0.4,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      delay: index * 0.2
    })
  })
})
</script>

<style scoped>
.dot-1 {
  animation: pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: 0s;
}

.dot-2 {
  animation: pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: 0.2s;
}

.dot-3 {
  animation: pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
