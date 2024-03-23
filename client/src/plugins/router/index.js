import { createRouter, createWebHistory } from "vue-router"


const routes = [
    {
        path: "/",
        name: "root",
        redirect: { name: "Home" },
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import("@/views/Home.vue")
            },
            {
                path: "portfolio",
                name: "Portfolio",
                component: () => import("@/views/Portfolio.vue")
            },
            {
                path: "account",
                name: "Account",
                component: () => import("@/views/Account.vue")
            },
            {
                path: "sandbox",
                name: "Sandbox",
                component: () => import("@/views/Sandbox.vue")
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default (app) => {
    app.use(router)
}