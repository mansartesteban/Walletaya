import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export default defineStore("toast", {
  state: () => {
    return {
      internalAlerts: [],
    };
  },
  getters: {
    toasts(state) {
      return this.internalAlerts.map((toast) => toast.message);
    },
  },
  actions: {
    push(message) {
      let id = uuid();
      this.internalAlerts.push({
        id,
        message,
      });
      setTimeout(() => {
        this.internalAlerts.splice(
          this.internalAlerts.findIndex((toast) => toast.id === id),
          1
        );
      }, 3000);
    },
  },
});
