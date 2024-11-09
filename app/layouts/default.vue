<template>
  <div class="h-screen w-screen">
    <LoadingComponent
      v-if="isLoading"
    />
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const loadingProgress = ref(0)
const assetsLoaded = ref(0)
const totalAssets = ref(0)

const updateProgress = () => {
  loadingProgress.value = (assetsLoaded.value / totalAssets.value) * 100
  if (loadingProgress.value >= 100) {
    setTimeout(() => {
      isLoading.value = false
    }, 100) // Petit délai pour assurer une transition fluide
  }
}

const trackAssetLoading = () => {
  // Récupérer tous les assets à charger
  const images = document.getElementsByTagName('img')

  totalAssets.value = images.length

  // Tracker le chargement des images
  Array.from(images).forEach((img) => {
    console.log(images)
    if (img.complete) {
      assetsLoaded.value++
    } else {
      img.onload = () => {
        assetsLoaded.value++
        updateProgress()
      }
      img.onerror = () => {
        assetsLoaded.value++
        updateProgress()
      }
    }
  })
  // Mettre à jour le progrès initial
  updateProgress()
}

// Attendre que le DOM soit complètement chargé
onMounted(() => {
  trackAssetLoading()
  isLoading.value = false

  // Fallback si certains assets ne se chargent pas
  setTimeout(() => {
    if (isLoading.value) {
      console.warn('Forcing load completion after timeout')
      isLoading.value = false
    }
  }, 10000)
})
</script>
