import { defineStore } from "pinia";
import database from "@/plugins/database";

const store = database.getStore("user");

export default defineStore("settings", {
  state: () => {
    return {
      defaultTokenFrom: null,
      defaultTokenTo: null,
      defaultCurrency: null,
      leftHanded: null,
      hasRedWelcomeMessage: null,
      favoriteTokens: [],
    };
  },
  actions: {
    setSetting(setting = "", value = null) {
      if (value !== undefined) {
        if (this.$state[setting] !== undefined) {
          this.$state[setting] = value;
        }
      }
      this.save();
    },
    save() {
      store.save(
        "settings",
        Object.assign({}, JSON.parse(JSON.stringify(this.$state)))
      );
    },
    starToken(token, add = null) {
      let foundIndex = this.favoriteTokens.findIndex(
        (favoriteToken) => favoriteToken === token.value
      );
      if (add !== null) {
        if (add) {
          if (foundIndex === -1) {
            this.favoriteTokens.push(token.value);
          }
        } else {
          if (foundIndex > -1) {
            this.favoriteTokens.splice(foundIndex, 1);
          }
        }
      } else {
        if (foundIndex > -1) {
          this.favoriteTokens.splice(foundIndex, 1);
        } else {
          this.favoriteTokens.push(token.value);
        }
      }
      this.save();
    },
    retrieve() {
      store.retrieve().then(() => {
        let settings = store.datas[0];
        if (settings) {
          settings = settings.value;
          if (settings) {
            Object.keys(settings).forEach((settingKey) => {
              if (this[settingKey] !== undefined) {
                this[settingKey] = settings[settingKey];
              }
            });
          }
        }
      });
    },
  },
});

/*

A11y:
- Right-handed/Left-handed :
  - Permits to modify interface actions to provide a better user experience
  - Exemple : When modify and delete buttons a next to each other, the delete button will be placed the farest to the main hand of the user to avoid misstouches 
 */
