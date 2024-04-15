import { defineStore } from "pinia";
import database from "@/plugins/database";

const store = database.getStore("user");

export default defineStore("settings", {
  state: () => {
    return {
      defaultTokenFrom: "tether",
      defaultTokenTo: "tether",
      defaultCurrency: "€",
      leftHanded: false,
      hasRedWelcomeMessage: false,
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
      store.save("settings", Object.assign({}, this.$state));
    },
    retrieve() {
      store.retrieve().then(() => {
        let settings = store.datas[0];
        if (settings) {
          settings = settings.value;
          if (settings) {
            console.log("setting sretrieved", settings);
            Object.keys(settings).forEach((settingKey) => {
              console.log("foreach", settingKey);
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
