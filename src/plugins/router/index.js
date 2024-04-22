import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        meta: {
          title: "Tracrypto",
        },
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "portfolio",
        name: "Portfolio",
        meta: {
          title: "Portfolio",
        },
        component: () => import("@/views/Portfolio/index.vue"),
      },
      {
        path: "account",
        name: "Account",
        meta: {
          title: "Compte",
        },
        component: () => import("@/views/Account/Index.vue"),
      },
      {
        path: "sandbox",
        name: "Sandbox",
        meta: {
          title: "Bac à sable (dev)",
        },
        component: () => import("@/views/Sandbox.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default (app) => {
  app.use(router);
};
