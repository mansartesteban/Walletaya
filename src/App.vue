<template>
  <AppBackground></AppBackground>
  <AppHeader ref="appHeader"></AppHeader>

  <div class="view">
    <router-view></router-view>
  </div>
  <NavBar></NavBar>
  <Dialog
    :opened="
      settings.hasRedWelcomeMessage !== undefined &&
      !settings.hasRedWelcomeMessage
    "
    title="Bienvenue !"
    @click="onConfirm"
  >
    <p>Bonjour à toi !</p>
    <p>
      Voici ton espace personnel pour connaître l'état de ton ou tes
      portefeuilles.
    </p>
  </Dialog>

  <WidgetDock></WidgetDock>
  <ContextMenu></ContextMenu>
</template>

<script setup>
import AppBackground from "@/components/AppBackground.vue";
import AppHeader from "@/components/AppHeader.vue";
import NavBar from "@/components/NavBar.vue";
import WidgetDock from "@/components/widgets/WidgetDock.vue";
import Dialog from "@/components/Dialog.vue";
import ContextMenu from "@/components/ContextMenu.vue";

import useTokenStore from "@/plugins/stores/TokenList";
import useSettingsStore from "@/plugins/stores/Settings";

const tokenStore = useTokenStore();
const settings = useSettingsStore();

const onConfirm = () => {
  settings.setSetting("hasRedWelcomeMessage", true);
};

onMounted(() => {
  tokenStore.refresh();
  settings.retrieve();
});
</script>

<style lang="scss">
@import "@/assets/styles/vars";

#app {
  height: 100dvh;
}

.view {
  padding-bottom: calc(var(--navbar-height));
  height: calc(100% - var(--header-height));
  scrollbar-width: none;
}

body {
  background: linear-gradient(-10deg, rgb(6, 9, 9) 0%, rgb(9, 26, 26) 100%);
  background-attachment: fixed;
  font-weight: 500;
  color: white;
}

html,
body {
  font-size: var(--default-font-size);
  font-family: Satoshi;
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
  - OK Du coup créer un composant "Widget" qui peut être ouvert, fermé, déplacé
    - OK ouvert
    - OK fermé
    - OK Déplacé

- TODO Avoir un calendrier
- TODO Imaginer un système de variables stockables (boite à outils).
  - TODO Pouvoir stocker une valeur
  - TODO Pourvoir récupérer une valeur n'importe où depuis ce stockage
  - TODO Que ces variables soient dynamiques (si elle change à un endroit, elle se met à jour partout)
  - TODO Pouvoir les dupliquer avec la valeur courante pour casser la réactivité
- TODO Ajouter un widget "conversion" pour convertir une monnaie dans une autre (fiat ou token)
- TODO Ajouter la traduction
- TOFIX Sur les tabs, lorsque l'on fait précédent les tab ne sont pas retriggered
- TODO Créer un fichier JS qui contient les variables CSS (pour partager les valeurs entre les 2, commme pour les animations)
- TODO Trouver un moyen plus sexy pour l'aller/retour sur les animations
- TODO Le menu outils ne se referme pas lorsque l'on clique en dehors
- TODO Recherhe sur les select
- TODO Virtual scroll
- TODO Biometric auth/ Authenticator
- TODO Calcul globaux (les mêmes que sur le détail de chaque crypto mais pour toutes)
- TODO Card/dialog d'accueil (avec steps ?)
- TODO Page d'accueil
- TODO Plusieurs portfolios
- TODO Préférence d'affichage :
        - Séparateur de milliers et décimaux (point/virgule, virgule/point, espace/virgule, espace/point)
- TODO Pouvoir mettre en favoris les tokens


-->
