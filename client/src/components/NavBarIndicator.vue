<template>
  <svg version="1.1" id="wave" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 119 26" fill="var(--color-primary)">
    <path class="path" :d="`M120.8,26C98.1,26,86.4,0,${60 + direction
      }.4,0C35.9,0,21.1,26,0.5,26H120.8z`" />
  </svg>
</template>

<script setup>
const props = defineProps({
  direction: {
    type: Number,
    default: 0,
  },
})
</script>
