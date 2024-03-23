<template>
    <div class="navbar flex align-items-stretch justify-content-space-evenly">
        <div v-for="menu in menus"
            class="navbar-button flex flex-column align-items-center justify-content-center gap-xs"
            @click="router.push(menu.route)">
            <div class="navbar-button-icon">
                <Icon>{{ menu.icon }}</Icon>
            </div>
            <div class="navbar-button-label">{{ menu.label }}</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

import Icon from "@/components/Icon.vue"

const menus = ref([
    {
        label: "Accueil",
        route: { name: "Home" },
        icon: "home"
    },
    {
        label: "Portfolio",
        route: { name: "Portfolio" },
        icon: "chart"
    },
    {
        label: "Mon compte",
        route: { name: "Account" },
        icon: "account"
    },
    {
        label: "Sandbox",
        route: { name: "Sandbox" },
        icon: "lifebuoy"
    }
])
</script>

<style scoped>
.navbar {
    width: 100%;
    background: var(--primary);
    height: 64px;
}

.navbar .navbar-button {
    height: 100%;
    width: 64px;
    text-align: center;
    cursor: pointer;
}

.navbar .navbar-button-label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    /* max-width: 100%; */
    font-size: .75rem;
}
</style>