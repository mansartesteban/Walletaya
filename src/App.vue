<template>
  <AppBackground></AppBackground>
  <AppHeader ref="appHeader"></AppHeader>

  <div class="view">
    <router-view></router-view>
  </div>
  <NavBar></NavBar>
  <Dialog
    :opened="settingsStore.hasRedWelcomeMessage === false"
    title="Bienvenue !"
    confirmLabel="J'ai compris"
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

import useAppStore from "@/plugins/stores/App";
import useTokenListStore from "@/plugins/stores/TokenList";
import useSettingsStore from "@/plugins/stores/Settings";
import { generateRandomChallenge } from "@/utils/Security";

const tokenListStore = useTokenListStore();
const settingsStore = useSettingsStore();
const appStore = useAppStore();

const onConfirm = () => {
  settingsStore.setSetting("hasRedWelcomeMessage", true);
};

onBeforeMount(() => {
  settingsStore.retrieve().then(() => {
    tokenListStore.refreshTokens(false, appStore.usedTokens);
  });
  appStore.retrieve().then(async () => {
    if (appStore.userCredentials) {
      try {
        //to verify a user's credentials, we simply pass the
        //unique ID of the passkey we saved against the user profile
        //in this demo, we just saved it in a global variable
        let credentials = await navigator.credentials.get({
          publicKey: {
            challenge: generateRandomChallenge(),
            allowCredentials: [
              { type: "public-key", id: appStore.userCredentials.rawId },
            ],
          },
        });
        appStore.setAuthentication(
          credentials.id === appStore.userCredentials.id
        );
      } catch (err) {
        alert(err);
      }
    }
  });
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
  margin: 0 auto;
  overflow-y: auto;
}

body {
  background: linear-gradient(-10deg, rgb(6, 9, 9) 0%, rgb(9, 26, 26) 100%);
  background-attachment: fixed;
  font-weight: 400;
  color: white;
}

html,
body {
  font-size: var(--default-font-size);
  font-family: Satoshi;
}
</style>

<!--

- TODO Ajouter la traduction
- TODO Créer un fichier JS qui contient les variables CSS (pour partager les valeurs entre les 2, comme pour les animations)
- TODO Avoir un calendrier

-->
