<template>
  <div class="h-screen w-screen bg-white flex flex-col text-center bg">
    <div class="flex flex-col birthstone text-5xl mt-10 mb-5">
      <p>Tu voulais plus de</p>
      <p class="text-8xl font-bold">
        Paillettes
      </p>
      <p>Dans ta vie</p>
      <p class="font-bold">
        ?!
      </p>
    </div>
    <GrattageComponent :text="whoText" />
    <p class="text-4xl birthstone backdrop">
      Gratte ci-dessus <br>(Avec ton doigt)
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  who: {
    type: String
  }
})
const whoText = ref('')
if (props.who == 'soeurs') {
  whoText.value = 'Tu vas encore devenir Tata !'
} else {
  whoText.value = 'Vous allez encore devenir Grands Parents !'
}
</script>

<style>
  .birthstone {
    font-family: 'Birthstone', sans-serif;
  }
  .gummy {
    font-family: "Sour Gummy", sans-serif;
  }
  .bg {
    background-image: url('public/images/stars.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
