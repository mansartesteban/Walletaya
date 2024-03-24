<template>
  <div class="main">

    <AppBar></AppBar>
    <br>
    <div class="view flex-1 flex justify-content-center">
      <router-view></router-view>
    </div>
    <NavBar></NavBar>
  </div>

  <WidgetDock></WidgetDock>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue"
import NavBar from "@/components/NavBar.vue"
import WidgetDock from "@/components/Widgets/WidgetDock.vue"
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

- TODO Avoir la variation sur 1h, 24h, 1 semaine, 1 mois, 1an, all-time
- TODO Avoir le coût moyyen d'achat par monnaie. Attention, si vente il y a le coût moyen diminue en conséquence.
  - TODO Avoir le coût moyen d'achat ET le coût moyen d'achat incluant les ventes
- TODO Créer des inputs number avec calcul intégré (et possibilité d'afficher une calculatrice)
- TODO Ajouter la date sur les transactions
- WIP Calculatrice
  - TODO Historique
  - OK Pouvoir la déplacer facilement
  - WIP Pour la placer dans un dock ? C'est à dire qu'elle se désaffiche de l'écran sans perdre le calcul en cours
  - WIP Du coup créer un composant "Window" qui peut être ouvert, fermé, déplacé, docké avec toolbar
- TODO Avoir un calendrier
- TODO Imaginer un système de variables stockables (boite à outils).
  - TODO Pouvoir stocker une valeur
  - TODO Pourvoir récupérer une valeur n'importe où depuis ce stockage
  - TODO Que ces variables soient dynamiques (si elle change à un endroit, elle se met à jour partout)
  - TODO Pouvoir les dupliquer avec la valeur courante pour casser la réactivité


-->