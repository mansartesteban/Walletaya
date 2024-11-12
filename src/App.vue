<template>
  <div class="h-screen min-h-screen">
    <Snack></Snack>

    <!-- <template v-if="appStore.isAuthenticated && appStore.userCredentials"> -->
    <AppHeader ref="appHeader"></AppHeader>

    <div class="h-[calc(100%-8rem)] mx-auto">
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
    <!-- <template v-else>
    <Dialog :opened="true" title="Autentification requise" centered>
      <div class="py-xl text-center">
        Tu ne peux pas avoir accès à Walleteya sans t'autentifier
      </div>
      <template #footer>
        <Btn @click="authenticate" icon="fingerprint">Réessayer</Btn>
      </template>
</Dialog>
</template> -->
  </div>
</template>

<script setup>
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

const authenticate = async () => {
  try {
    let credentials = await navigator.credentials.get({
      publicKey: {
        challenge: generateRandomChallenge(),
        allowCredentials: [
          { type: "public-key", id: appStore.userCredentials.rawId },
        ],
      },
    });
    appStore.setAuthentication(credentials.id);
  } catch (err) {
    // alert(err);
  }
};

onBeforeMount(() => {
  settingsStore.retrieve();
  appStore.retrieve().then(async () => {
    // if (!appStore.isAuthenticated && appStore.userCredentials) {
    // authenticate()
    tokenListStore.refreshTokens(true, appStore.usedTokens);
    // }
  });
});
</script>
