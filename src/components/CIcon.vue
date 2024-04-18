<template>
  <img
    :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`"
    style="width: 1.5rem; height: 1.5rem"
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
  typeof props.token === "object" ? props.token.id : props.token
);
</script>

<style scoped>
img {
  border-radius: 99px;
}
</style>
