import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/styles/index.scss";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import stores from "@/plugins/stores";
import router from "@/plugins/router";
import directives from "./directives";
// import database from "@/plugins/database";

const app = createApp(App);

stores(app);
router(app);
directives(app);

app.mount("#app");
