import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/styles/index.scss";

import stores from "@/plugins/stores";
import router from "@/plugins/router";
import directives from "./directives";
import database from "@/plugins/database";

const app = createApp(App);

stores(app);
router(app);
database(app);
directives(app);

app.mount("#app");
