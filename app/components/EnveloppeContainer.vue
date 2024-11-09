<!-- EnvelopeInvitation.vue -->
<template>
  <div class="container">
    <div class="content">
      <div
        class="envelope"
        @click="openCard"
      >
        <div
          ref="envelope-flap"
          class="envelope-flap"
        />
      </div>
      <div class="letter rounded-xl w-[90vw] h-fit lg:w-[50vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="body overflow-hidden rounded-lg">
          <span
            class="close"
            @click.stop="closeCard"
          >x</span>
        </div>
      </div>
      <div class="shadow" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

// Define the timelines
let t1, t2

const envelopeFlap = ref(null)

const handleClickOutside = (event) => {
  const letterElement = document.querySelector('.letter')
  if (letterElement && !letterElement.contains(event.target)) {
    closeCard()
  }
}

const openCard = () => {
  t1.play()
  t2.play()
}

const closeCard = () => {
  t1.reverse()
  t2.reverse()
}

onMounted(() => {
  t1 = gsap.timeline({ paused: true, onReverseComplete: () => {
    document.querySelector('.envelope').classList.remove('animate')
  } })
  t1.add(() => {
    document.querySelector('.envelope').classList.add('animate')
  })
    .to('.letter', {
      translateY: -200,
      duration: 0.9,
      ease: 'back.inOut(1.5)'
    })
    .set('.letter', { zIndex: 40 })
    .to('.letter', {
      duration: 0.7,
      ease: 'back.out(.4)',
      translateY: -5,
      width: '90vw',
      height: '90vh'
    })

  t2 = gsap.timeline({ paused: true })
  t2.to('.shadow', {
    delay: 1.4,
    width: 450,
    boxShadow: '-75px 150px 10px 5px #eeeef3',
    ease: 'back.out(.2)',
    duration: 0.7
  })
})

onUnmounted(() => {
  // Clean up timelines on component unmount
  t1.kill()
  t2.kill()
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
:root {
  --base: #5E5690;
  --base-light: #7873A7;
  --base-dark: #555184;
  --shadow: #4F4C6B;
  --letter: #d8d7e5;
}

* {
  border: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  position: relative;
  perspective: 600px;
}

.shadow {
  position: absolute;
  width: 200px;
  height: 1px;
  background: transparent;
  border-radius: 30%;
  box-shadow: 50px 100px 10px 5px #eeeef3;
}

.letter {
  position: absolute;
  width: 280px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  background-image: url('public/content.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  box-shadow: 0px 0px 1px black;
}

.letter .body {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.letter .body .close {
  position: absolute;
  right: 0;
  top: -7px;
  font-size: 24px;
  color: red;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
}

.letter .body .message {
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  font-family: 'Great Vibes', cursive;
}

.envelope {
  position: relative;
  width: 300px;
  height: 180px;
  background: linear-gradient(#cccbd7 0.5px, #7873A7 0.5px);
  cursor: pointer;
}

.envelope::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  border-top: 115px solid rgb(120, 115, 167);
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  box-sizing: border-box;
  z-index: 30;
  transform-origin: center top;
  transition: all 0.5s ease;
}

.envelope:hover::before {
  transform: rotateX(30deg);
}

.envelope.animate::before {
  transform: rotateX(180deg);
  z-index: 10;
}

.envelope::after {
  content: '';
  position: absolute;
  top: 0;
  width: 300px;
  height: 180px;
  z-index: 25;
  background: linear-gradient(30deg, #555184 47%, #4F4C6B 50%, #5E5690 50%) 150px 90px / 150px 90px no-repeat, linear-gradient(31deg, #5E5690 49%, #4F4C6B 50%, transparent 50%) 0px 0px / 152px 90px no-repeat, linear-gradient(150deg, #5E5690 50%, #4F4C6B 50%, #555184 53%) 0px 90px / 151px 90px no-repeat, linear-gradient(148.7deg, transparent 50%, #4F4C6B 50%, #5E5690 51%) 150px 0px / 150px 90px no-repeat;
}
</style>
