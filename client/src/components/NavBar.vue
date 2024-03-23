<template>
    <div class="navbar flex align-items-stretch justify-content-space-evenly">
        <template v-for="menu in menus">
            <router-link class="navbar-button flex flex-column align-items-center justify-content-center gap-xs"
                :to="menu.route">
                <div class="navbar-button-icon">
                    <Icon>{{ menu.icon }}</Icon>
                </div>
                <div class="navbar-button-label">{{ menu.label }}</div>
            </router-link>
        </template>
        <div ref="indicator" class="navbar-button-indicator"></div>
    </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const indicator = ref()



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

watch(() => route.fullPath, () => {
    const foundIndex = menus.value.findIndex(menu => menu.route.name === route.name)
    indicator.value.style.left = `calc(${foundIndex} * 25%)`
})
</script>

<style scoped>
.navbar {
    position: absolute;
    bottom: 0;
    width: calc(100% - var(--md) * 2);
    background: var(--primary);
    height: 64px;
    margin: var(--md);
    border-radius: var(--md);

    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.navbar .navbar-button {
    height: 100%;
    flex: 1;
    text-align: center;
    cursor: pointer;
    color: white;
    text-decoration: none;
}

.navbar .navbar-button-indicator {
    position: absolute;
    left: 0;
    border-radius: var(--md);
    background: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    padding: 0;
    margin: 0px;
    width: calc(25% - 0px);
    height: calc(100% - 0px);
    pointer-events: none;
    transition: var(--transition-menus);

    /* width: 100%; */
    /* height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: repeat;
    background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3CclipPath id=%22b%22%3E%3Cpath fill=%22currentColor%22 d=%22M838.5 633.5Q818 767 691 814t-282 79q-155 32-241.5-104.5T91 503.5q10-148.5 93-278t230-100Q561 155 712 175t149 172.5q-2 152.5-22.5 286Z%22%2F%3E%3C%2FclipPath%3E%3Cfilter id=%22a%22 x=%22-50vw%22 y=%22-50vh%22 width=%22100vw%22 height=%22100vh%22%3E%3CfeFlood flood-color=%22%23fff%22 result=%22neutral-gray%22%2F%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%222.5%22 numOctaves=%22100%22 stitchTiles=%22stitch%22 result=%22noise%22%2F%3E%3CfeColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 result=%22destaturatedNoise%22%2F%3E%3CfeComponentTransfer in=%22desaturatedNoise%22 result=%22theNoise%22%3E%3CfeFuncA type=%22table%22 tableValues=%220 0 0.15 0%22%2F%3E%3C%2FfeComponentTransfer%3E%3CfeBlend in=%22SourceGraphic%22 in2=%22theNoise%22 mode=%22soft-light%22 result=%22noisy-image%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg filter=%22url(%23a)%22 clip-path=%22url(%23b)%22%3E%3Cpath fill=%22%23fff%22 d=%22M838.5 633.5Q818 767 691 814t-282 79q-155 32-241.5-104.5T91 503.5q10-148.5 93-278t230-100Q561 155 712 175t149 172.5q-2 152.5-22.5 286Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"); */

}

.navbar .navbar-button.router-link-exact-active {
    color: var(--primary);
    z-index: 1;
    animation: navbar-indicator-animation .29s ease-in-out;
}

@keyframes navbar-indicator-animation {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(.7);
    }

    100% {
        transform: scale(1);
    }
}

.navbar .navbar-button-label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: .75rem;
}
</style>