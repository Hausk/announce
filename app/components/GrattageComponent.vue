<!-- ScratchCard.vue -->
<template>
  <div class="w-[70%] mx-auto bg-black rounded-full mt-0 p-1">
    <div class="relative w-full aspect-square max-w-xl mx-auto rounded-full overflow-hidden">
      <!-- Canvas de grattage -->
      <canvas
        ref="scratchCanvas"
        :width="canvasSize"
        :height="canvasSize"
        class="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-0 z-30 rounded-full left-0"
        @mousedown="startDrawing"
        @mouseup="stopDrawing"
        @mousemove="draw"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
      />

      <div
        v-if="loading"
        class="absolute z-20 w-full h-full bg-black"
      />
      <div
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center baby"
      >
        <div class="text-pretty text-center w-[90%] h-full text-white flex flex-col justify-around">
          <p class="text-3xl birthstone font-bold">
            Prépare-toi
          </p>
          <p class="text-2xl gummy">
            {{ props.text }}
          </p>
          <p class="text-md gummy w-[70%] mx-auto text-wrap text-white font-bold">
            Je suis attendu(e) pour <span class="">Mai 2025</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Références et états
const scratchCanvas = ref(null)
const scratchContext = ref(null)
const drawing = ref(false)
const mousePos = ref({ x: 0, y: 0 })
const lastPos = ref({ x: 0, y: 0 })
const canvasSize = ref(1000) // Taille de base du canvas pour une bonne résolution
const glitterImage = ref(null)
const loading = ref(true)
// Configuration du canvas
const STROKE_WIDTH = 40

const props = defineProps({
  text: {
    type: String
  }
})
// Chargement et initialisation de l'image de paillettes
const loadGlitterImage = () => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      glitterImage.value = img
      resolve()
    }
    img.src = '/images/paillettes.png'
  })
}

// Initialisation du canvas
const initCanvas = async () => {
  // Attendre le chargement de l'image
  await loadGlitterImage()

  const ctx = scratchCanvas.value.getContext('2d')
  scratchContext.value = ctx

  // Configuration du style
  ctx.lineWidth = STROKE_WIDTH
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  resetCanvas()
}

// Réinitialisation du canvas
const resetCanvas = () => {
  const ctx = scratchContext.value
  if (!ctx || !glitterImage.value) return

  // Effacer le canvas
  ctx.clearRect(0, 0, scratchCanvas.value.width, scratchCanvas.value.height)

  // Dessiner le fond avec coins arrondis
  const radius = 30 // Rayon des coins arrondis
  ctx.save()

  // Créer le chemin pour les coins arrondis
  ctx.beginPath()
  ctx.moveTo(radius, 0)
  ctx.lineTo(scratchCanvas.value.width - radius, 0)
  ctx.quadraticCurveTo(scratchCanvas.value.width, 0, scratchCanvas.value.width, radius)
  ctx.lineTo(scratchCanvas.value.width, scratchCanvas.value.height - radius)
  ctx.quadraticCurveTo(scratchCanvas.value.width, scratchCanvas.value.height, scratchCanvas.value.width - radius, scratchCanvas.value.height)
  ctx.lineTo(radius, scratchCanvas.value.height)
  ctx.quadraticCurveTo(0, scratchCanvas.value.height, 0, scratchCanvas.value.height - radius)
  ctx.lineTo(0, radius)
  ctx.quadraticCurveTo(0, 0, radius, 0)
  ctx.closePath()

  // Clipper le canvas aux coins arrondis
  ctx.clip()

  // Dessiner l'image de paillettes en motif répété
  const pattern = ctx.createPattern(glitterImage.value, 'repeat')
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, scratchCanvas.value.width, scratchCanvas.value.height)

  ctx.restore()
}

onMounted(() => {
  // Initialiser le canvas
  initCanvas()

  // Démarrer la boucle d'animation
  requestAnimationFrame(drawLoop)

  // Empêcher le défilement sur mobile
  document.body.addEventListener('touchstart', preventDefaultForCanvas, { passive: false })
  document.body.addEventListener('touchend', preventDefaultForCanvas, { passive: false })
  document.body.addEventListener('touchmove', preventDefaultForCanvas, { passive: false })

  // Gérer le redimensionnement
  window.addEventListener('resize', resetCanvas)

  setTimeout(() => {
    loading.value = false
  }, 1000)
})

onUnmounted(() => {
  document.body.removeEventListener('touchstart', preventDefaultForCanvas)
  document.body.removeEventListener('touchend', preventDefaultForCanvas)
  document.body.removeEventListener('touchmove', preventDefaultForCanvas)
  window.removeEventListener('resize', resetCanvas)
})

// Gestionnaires d'événements souris
const startDrawing = (e) => {
  drawing.value = true
  lastPos.value = getMousePos(scratchCanvas.value, e)
}

const stopDrawing = () => {
  drawing.value = false
}

const draw = (e) => {
  mousePos.value = getMousePos(scratchCanvas.value, e)
}

// Gestionnaires d'événements tactiles
const handleTouchStart = (e) => {
  mousePos.value = getTouchPos(scratchCanvas.value, e)
  const touch = e.touches[0]
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  })
  scratchCanvas.value.dispatchEvent(mouseEvent)
}

const handleTouchEnd = () => {
  const mouseEvent = new MouseEvent('mouseup', {})
  scratchCanvas.value.dispatchEvent(mouseEvent)
}

const handleTouchMove = (e) => {
  const touch = e.touches[0]
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  })
  scratchCanvas.value.dispatchEvent(mouseEvent)
}

// Fonctions utilitaires
const getMousePos = (canvasDom, mouseEvent) => {
  const rect = canvasDom.getBoundingClientRect()
  const scaleX = canvasDom.width / rect.width
  const scaleY = canvasDom.height / rect.height
  return {
    x: (mouseEvent.clientX - rect.left) * scaleX,
    y: (mouseEvent.clientY - rect.top) * scaleY
  }
}

const getTouchPos = (canvasDom, touchEvent) => {
  const rect = canvasDom.getBoundingClientRect()
  const scaleX = canvasDom.width / rect.width
  const scaleY = canvasDom.height / rect.height
  return {
    x: (touchEvent.touches[0].clientX - rect.left) * scaleX,
    y: (touchEvent.touches[0].clientY - rect.top) * scaleY
  }
}

const preventDefaultForCanvas = (e) => {
  if (e.target === scratchCanvas.value) {
    e.preventDefault()
  }
}

// Fonction de rendu
const renderCanvas = () => {
  if (drawing.value && scratchContext.value) {
    scratchContext.value.moveTo(lastPos.value.x, lastPos.value.y)
    scratchContext.value.lineTo(mousePos.value.x, mousePos.value.y)
    scratchContext.value.globalCompositeOperation = 'destination-out'
    scratchContext.value.stroke()
    lastPos.value = { ...mousePos.value }
  }
}

// Boucle d'animation
const drawLoop = () => {
  requestAnimationFrame(drawLoop)
  renderCanvas()
}
</script>

<style lang="css" scoped>
.baby {
  background-image: url('public/images/baby.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
