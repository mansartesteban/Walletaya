<template>
  <div class="main flex flex-column">
    <div class="view flex-1 flex flex-column align-items-center justify-content-center">
      <router-view></router-view>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue"
</script>

<style scoped></style>

<!--

  TODO:
  - Avoir la variation sur 1h, 24h, 1 semaine, 1 mois, 1an, all-time
  - Avoir le coût moyyen d'achat par monnaie. Attention, si vente il y a le coût moyen diminue en conséquence.
    Avoir le coût moyen d'achat ET le coût moyen d'achat incluant les ventes
  - Développer pour mobile ! (MOBILE FIRST)

-->