<!-- CurvedText.vue -->
<template>
  <div class="w-full flex justify-center items-center">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 100 100"
    >
      <defs>
        <path
          :id="pathId"
          :d="getArcPath"
          fill="none"
          stroke="transparent"
        />
      </defs>
      <text
        class="text-lg"
        :fill="textColor"
      >
        <textPath
          :href="'#' + pathId"
          startOffset="50%"
          text-anchor="middle"
        >
          {{ text }}
        </textPath>
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CurvedText',
  props: {
    text: {
      type: String,
      required: true
    },
    radius: {
      type: Number,
      default: 40
    },
    size: {
      type: Number,
      default: 200
    },
    textColor: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      pathId: `curved-text-path-${Math.random().toString(36).substr(2, 9)}`
    }
  },
  computed: {
    getArcPath() {
      // Centre du cercle
      const cx = 50
      const cy = 50
      // Crée un arc de cercle
      return `M ${cx - this.radius} ${cy} A ${this.radius} ${this.radius} 0 1 1 ${cx + this.radius} ${cy}`
    }
  }
}
</script>
