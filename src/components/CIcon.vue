<template>
  <img
    :src="`https://s2.coinmarketcap.com/static/img/coins/64x64/${$attrs.token}.png`"
    style="width: 1.5rem; height: 1.5rem"
  />
</template>

<style scoped>
img {
  border-radius: 99px;
}
</style>
