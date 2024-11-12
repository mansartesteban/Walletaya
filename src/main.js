import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/styles/style.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import stores from "@/plugins/stores";
import router from "@/plugins/router";
import directives from "./directives";
// import database from "@/plugins/database";

const app = createApp(App);
router(app);
directives(app);
stores(app);

app.mount("#app");
