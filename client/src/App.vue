<template>
  <div class="main">
    <Portfolio></Portfolio>
  </div>
</template>

<script setup>
import Portfolio from "./components/Portfolio.vue"

const model = ref()
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

}
</style>

<!--

  TODO:
  - Avoir la variation sur 1h, 24h, 1semainen, 1 mois, 1an, all-time
  - Avoir le coût moyyen d'achat par monnaie. Attention, si vente il y a le coût moyen diminue en conséquence.
    Avoir le coût moyen d'achat ET le coût moyen d'achat incluant les ventes
  - Développer pour mobile ! (MOBILE FIRST)

-->