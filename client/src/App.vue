<template>
  <div class="main">
    <AppBar></AppBar>
    <div class="view flex-1 flex justify-content-center">
      <router-view></router-view>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import AppBar from "./components/AppBar.vue"
import NavBar from "./components/NavBar.vue"
</script>

<style>
.view {
  margin: 0 var(--md) calc(var(--md)) var(--md);
  padding: 0 1rem;
  height: calc(100% - 64px);
  overflow-y: auto;
  overflow-x: hidden;
}

.view>div {
  height: fit-content;
  padding-bottom: 80px;
  max-width: 100%;
  margin: 1rem;
}

body {
  background: linear-gradient(-10deg, rgb(25, 26, 26) .2%, #1b8087 91.1%);
  font-size: 20px;
  font-family: Fredoka;
  color: white;
}

body,
#app {
  height: 100dvh;
  width: 100dvw;
  overflow: hidden;
}

.main {
  height: 100%;
  padding-bottom: 64px;
}
</style>

<!--

  TODO:
  - Avoir la variation sur 1h, 24h, 1 semaine, 1 mois, 1an, all-time
  - Avoir le coût moyyen d'achat par monnaie. Attention, si vente il y a le coût moyen diminue en conséquence.
    Avoir le coût moyen d'achat ET le coût moyen d'achat incluant les ventes
  - Développer pour mobile ! (MOBILE FIRST)
  - Créer des inputs number avec calcul intégré (et possibilité d'afficher une calculatrice)
  - Ajouter la date sur les transactions
  - Calculatrice
    - Historique
    - Pouvoir la déplacer facilement
    - Pour la placer dans un dock ? C'est à dire qu'elle se désaffiche de l'écran sans perdre le calcul en cours
    - Du coup créer un composant "Window" qui peut être ouvert, fermé, déplacé, docké avec toolbar

-->