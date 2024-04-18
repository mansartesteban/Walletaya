import { defineStore } from "pinia";

import useSettingsStore from "@/plugins/stores/Settings";
import useWalletStore from "@/plugins/stores/Wallet";

export default defineStore("app", {
  getters: {
    usedTokens() {
      return [
        ...new Set([
          ...useWalletStore().usedTokens,
          ...useSettingsStore().favoriteTokens,
        ]),
      ];
    },
  },
  actions: {},
});
