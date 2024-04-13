import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/styles/index.scss";

import router from "@/plugins/router";
import directives from "./directives";
import viewport from "@/plugins/viewport";
import database from "@/plugins/database";

const app = createApp(App);

router(app);
viewport(app);
database(app);
directives(app);

app.mount("#app");
