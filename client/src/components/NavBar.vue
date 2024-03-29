<template>
  <div class="navbar flex align-items-stretch justify-content-space-evenly">
    <template v-for="menu in menus">
      <router-link
        class="navbar-button flex flex-column align-items-center justify-content-center gap-xs"
        :to="menu.route"
      >
        <div class="navbar-button-icon" @click="click">
          <Icon>{{ menu.icon }}</Icon>
        </div>
        <div
          class="navbar-button-label"
          :style="{ fontSize: menu.size || '.75rem' }"
        >
          {{ menu.label }}
        </div>
      </router-link>
    </template>
    <div
      class="navbar-button flex flex-column align-items-center justify-content-center gap-xs"
    >
      <div class="navbar-button-icon" @click="toolDockOpened = !toolDockOpened">
        <Icon>tools</Icon>
      </div>
      <div class="navbar-button-label">Outils</div>
      <div
        class="tool-dock flex flex-column gap-md mb-md"
        :class="{ 'tool-dock-opened': toolDockOpened }"
      >
        <div
          class="tool-dock-app flex glass align-items-center gap-sm p-sm py-xs"
          @click="toggleApp"
        >
          <div class="tool-dock-button-label">Calculatrice</div>
          <Btn icon="calculator" class="p-sm rounded-md"></Btn>
        </div>
      </div>
    </div>
    <div ref="indicator" class="navbar-button-indicator"></div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import Btn from "@/components/Btn.vue";

import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import WidgetService from "@/Services/WidgetService";

function click() {
  console.log("j'ai clické chef !");
}
const calculator = WidgetService.Calculator;

const route = useRoute();
const indicator = ref();

const toolDockOpened = ref(false);

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
    size: ".6rem !important",
  },
  {
    label: "Sandbox",
    route: { name: "Sandbox" },
    icon: "lifebuoy",
  },
]);

function toggleApp(app = "") {
  calculator.toggle();
  toolDockOpened.value = false;
}

watch(
  () => route.fullPath,
  () => {
    const foundIndex = menus.value.findIndex(
      (menu) => menu.route.name === route.name
    );
    indicator.value.style.left = `calc(${foundIndex} * 20%)`;
  }
);

onMounted(() => {
  let elements = [...document.querySelectorAll(".tool-dock-app")].reverse();

  elements.forEach((item, index) => {
    item.style.transitionDelay = index * (200 / elements.length) + "ms";
  });
});
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: var(--sm);
  width: calc(100% - var(--sm) * 2);
  background: var(--primary);
  height: 64px;
  margin: var(--sm);
  border-radius: var(--md);
  z-index: 100000;
  box-shadow: var(--volume-shadow);
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
  --indicator-margin: 0.75rem;
  position: absolute;
  left: 0;
  border-radius: var(--md);
  background: rgba(255, 255, 255, 1);
  box-shadow: var(--volume-shadow);
  padding: 0.5rem 0;
  margin: calc(var(--indicator-margin) / -2);
  width: calc(20% + var(--indicator-margin));
  height: calc(100% + var(--indicator-margin));
  pointer-events: none;
  transition: var(--transition-menus);
}

.navbar .navbar-button.router-link-exact-active {
  color: var(--primary);
  z-index: 1;
  animation: navbar-indicator-animation 0.29s ease-in-out;
}

@keyframes navbar-indicator-animation {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.7);
  }

  100% {
    transform: scale(1);
  }
}

.navbar .navbar-button-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.75rem;
}

.tool-dock {
  position: absolute;
  bottom: 100%;
  right: 0;
  /* height: 0; */
  height: fit-content;
  overflow-y: hidden;
  display: none;
}

.tool-dock.tool-dock-opened {
  height: fit-content;
  display: block;
}

.tool-dock .tool-dock-app {
  /* position: absolute;
    right: 0; */
  transform: scale(0);
  transition: var(--transition);
}

.tool-dock.tool-dock-opened .tool-dock-app {
  transform: scale(1);
  /* left: 0; */
}
</style>
