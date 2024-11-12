<template>
  <img
    :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`"
    class="w-6 h-6 rounded-full"
  />
</template>

<script setup>
const props = defineProps({
  token: {
    type: [String, Object],
    default: null,
  },
});

const id = computed(() =>
  typeof props.token === "object" ? props.token.id : props.token,
);
</script>
