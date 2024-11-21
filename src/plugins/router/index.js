import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: { name: "Login" },
    children: [
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/Authentication/Register.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/Authentication/Login.vue"),
      },
    ],
  },
  {
    path: "/app",
    name: "authenticatedRoot",
    redirect: { name: "Home" },
    component: () => import("@/views/AppAuthenticated.vue"),
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = false;
  if (["Register", "Login"].includes(to.name)) {
    if (isAuthenticated) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (!isAuthenticated) {
      next({ name: "Login" });
    } else {
      next();
    }
  }
});

export default (app) => {
  app.use(router);
};
