import { defineStore } from "pinia";

import useSettingsStore from "@/plugins/stores/Settings";
import useWalletStore from "@/plugins/stores/Wallet";
import database from "@/plugins/database";
import { useBase64 } from "@vueuse/core";

const store = database.getStore("app");

export default defineStore("app", {
  state() {
    return {
      userCredentials: null,
      isAuthenticated: false,
    };
  },
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
  actions: {
    setAuthentication(value) {
      sessionStorage.setItem(useBase64("walletaya-auth-token"), value);
      this.isAuthenticated = !!sessionStorage.getItem(
        useBase64("walletaya-auth-token")
      );
    },
    saveUserCredentials(data) {
      store.save("userCredentials", data).then(() => {
        this.userCredentials = data;
        this.setAuthentication(data.id);
      });
    },
    removeUserCredentials() {
      store.delete("userCredentials").then(() => {
        this.userCredentials = null;
      });
    },
    retrieve() {
      let promise = store.retrieve();

      promise.then(() => {
        let userCredentials = store.datas[0];
        this.userCredentials = userCredentials?.value;
      });

      this.isAuthenticated = !!sessionStorage.getItem(
        useBase64("walletaya-auth-token")
      );

      return promise;
    },
  },
});
