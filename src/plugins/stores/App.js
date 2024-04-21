import { defineStore } from "pinia";

import useSettingsStore from "@/plugins/stores/Settings";
import useWalletStore from "@/plugins/stores/Wallet";
import database from "@/plugins/database";

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
      this.isAuthenticated = value;
      // setTimeout(5000)
    },
    saveUserCredentials(data) {
      store.save("userCredentials", data).then(() => {
        this.userCredentials = data;
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
      return promise;
    },
  },
});
