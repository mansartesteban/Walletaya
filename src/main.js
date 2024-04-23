import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/styles/index.scss";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import stores from "@/plugins/stores";
import router from "@/plugins/router";
import directives from "@/directives";
import serviceWorkers from "@/service-workers";

const app = createApp(App);
router(app);
directives(app);
stores(app);
serviceWorkers(app);

app.mount("#app");
