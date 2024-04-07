<template>
  <div class="navbar flex align-items-stretch justify-content-space-evenly">
    <template v-for="menu in menus">
      <router-link class="navbar-button flex flex-column align-items-center justify-content-center gap-xs"
        :to="menu.route">
        <div class="navbar-button-icon">
          <Icon>{{ menu.icon }}</Icon>
        </div>
        <div class="navbar-button-label">
          {{ menu.label }}
        </div>
      </router-link>
    </template>
    <div class="navbar-button flex flex-column align-items-center justify-content-center gap-xs">
      <div class="navbar-button-icon" @click="toolDockOpened = !toolDockOpened">
        <Icon>tools</Icon>
      </div>
      <div class="navbar-button-label">Outils</div>
      <div class="tool-dock flex flex-column gap-md mb-md" :class="{ 'tool-dock-opened': toolDockOpened }">
        <div class="tool-dock-app flex glass align-items-center gap-sm p-sm py-xs" @click="toggleApp">
          <div class="tool-dock-button-label">Calculatrice</div>
          <Btn icon="calculator" class="p-sm rounded-md"></Btn>
        </div>
      </div>
    </div>
    <navbar-indicator class="navbar-button-indicator" :direction="direction" :style="indicatorStyle"></navbar-indicator>
  </div>
</template>

<script setup>
import NavbarIndicator from "@/components/NavBarIndicator.vue"
import Icon from "@/components/Icon.vue"
import Btn from "@/components/Btn.vue"

import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { animate, easingFunctions } from "@/utils/Animate"

import WidgetService from "@/Services/WidgetService"

const calculator = WidgetService.Calculator
const route = useRoute()
const toolDockOpened = ref(false)
const direction = ref(0)

const menus = ref([
  {
    label: "Accueil",
    route: { name: "Home" },
    icon: "home",
  },
  {
    label: "Portfolio",
    route: { name: "Portfolio" },
    icon: "chart",
  },
  {
    label: "Mon compte",
    route: { name: "Account" },
    icon: "account",
  },
  {
    label: "Sandbox",
    route: { name: "Sandbox" },
    icon: "chart",
  },
])

const routeMenuIndex = computed(() => {
  const foundIndex = menus.value.findIndex(
    (menu) => menu.route.name === route.name
  )
  return foundIndex > -1 ? foundIndex : 0
})
const indicatorStyle = computed(() => ({
  left: `calc(${routeMenuIndex.value} * ${100 / (menus.value.length + 1)}%)`,
  width: `calc(${100 / (menus.value.length + 1)}%)`
}))

function toggleApp(app = "") {
  calculator.toggle()
  toolDockOpened.value = false
}

watch(
  () => routeMenuIndex.value,
  (oldValue, newValue) => {
    animate(
      (value) => {
        direction.value = value
      },
      oldValue < newValue ? -30 : 30,
      290,
      easingFunctions.easeOutBack,
      true
    )
  }
)

onMounted(() => {
  let elements = [...document.querySelectorAll(".tool-dock-app")].reverse()

  elements.forEach((item, index) => {
    item.style.transitionDelay = index * (200 / elements.length) + "ms"
  })
})
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--color-primary);
  height: 56px;
  z-index: 100000;
}

.navbar .navbar-button {
  height: 100%;
  flex: 1;
  text-align: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.66);
  text-decoration: none;
  position: relative;
  top: 0;
  transition: var(--transition-menus);
  width: calc(100% / (v-bind("menus.length") + 1))
}

.navbar .navbar-button-indicator {
  --indicator-margin: 0rem;
  position: absolute;
  bottom: 100%;
  left: 0;
  width: calc(20% + var(--indicator-margin));
  pointer-events: none;
  transition: var(--transition-menus);
}

.navbar .navbar-button.router-link-exact-active {
  z-index: 1;
  animation: navbar-indicator-animation 0.29s ease-in-out;
  color: white;
}

.navbar .navbar-button svg {
  position: relative;
  top: 0;
  transition: var(--transition-menus);
}

.navbar .navbar-button.router-link-exact-active svg {
  top: -8px;
  width: 32px;
  height: 32px;
}

.navbar .navbar-button.router-link-exact-active .navbar-button-label {
  top: -6px;
}

.navbar .navbar-button-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.75rem;
  position: relative;
  top: 0;
  transition: var(--transition-menus);
}

.navbar .navbar-button-icon svg {
  width: 20px;
  height: 20px;
}

.tool-dock {
  position: absolute;
  bottom: 100%;
  right: 0;
  height: fit-content;
  overflow-y: hidden;
  display: none;
}

.tool-dock.tool-dock-opened {
  height: fit-content;
  display: block;
}

.tool-dock .tool-dock-app {
  transform: scale(0);
  transition: var(--transition);
}

.tool-dock.tool-dock-opened .tool-dock-app {
  transform: scale(1);
}
</style>
