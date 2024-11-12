<template>
  <div class="flex items-center justify-center h-12 w-12 drop-shadow-md">
    <template v-if="letters">
      {{ letters }}
    </template>
    <template v-else>
      <img
        :src="src"
        width="100%"
        height="100%"
        class="rounded-full"
      />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  letters: {
    type: String,
    default: undefined,
    validator: (value) => value.length == 2,
  },
});
</script>
