<template>
  <div
    class="fixed flex items-stretch justify-content-space-evenly bottom-0 h-16 w-full"
  >
    <div
      :class="{ 'has-fab': hasFab }"
      class="group absolute top-0 left-0 right-0 bottom-0 -z-10 flex items-end overflow-clip"
    >
      <div
        class="group-[.has-fab]:rounded-tr-xl bg-primary-nogradient flex-1 h-full"
      ></div>
      <div
        class="group-[:not(.has-fab)]:hidden relative bg-primary-nogradient w-16 h-6 before:content-[''] before:absolute before:rounded-bl-full before:shadow-[0_2rem_0_var(--primary-color)] before:-top-16 before:left-0 before:transparent before:w-8 before:h-16 after:content-[''] after:absolute after:rounded-br-full after:-top-16 after:right-0 after:transparent after:w-8 after:h-16 after:shadow-[0_2rem_0_var(--primary-color)]"
      ></div>
      <div
        class="group-[.has-fab]:rounded-tl-xl bg-primary-nogradient flex-1 h-full"
      ></div>
    </div>
    <template v-for="menu in menus">
      <router-link
        class="group"
        custom
        :to="menu.route"
        v-slot="{ isActive, href, navigate }"
      >
        <a
          v-bind="$attrs"
          :href="href"
          @click="navigate"
          class="[&:not(.router-link-exact-active)]:gap-1 h-100 flex flex-col flex-1 items-center justify-center text-sm"
          :class="{ 'text-white/50': !isActive }"
        >
          <span
            class="mi"
            :class="isActive ? 'text-lg leading-5' : 'text-2xl leading-6'"
            >{{ menu.icon }}</span
          >
          <div class="navbar-button-label">
            {{ menu.label }}
          </div>
        </a>
      </router-link>
    </template>
    <!-- <div ref="tooldockButton" class="navbar-button flex flex-col align-items-center justify-content-center gap-xs"
      @click="toggleDock">
      <div class="navbar-button-icon">
        <Icon>tools</Icon>
      </div>
      <div class="navbar-button-label">Outils</div>
      <div ref="tooldock" class="tool-dock flex flex-column gap-md mb-md"
        :class="{ 'tool-dock-opened': toolDockOpened }">
        <div class="tool-dock-app flex glass align-items-center gap-sm p-sm py-xs rounded-md" @click.stop="toggleApp">
          <div class="tool-dock-button-label">Calculatrice</div>
          <Btn icon="calculator" class="p-sm rounded-md"></Btn>
        </div>
      </div>
    </div> -->
    <!-- <navbar-indicator
      class="navbar-button-indicator"
      :direction="direction"
      :style="indicatorStyle"
    ></navbar-indicator> -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { animate, easingFunctions } from "@/utils/Animate";
import { onClickOutside } from "@vueuse/core";

import WidgetService from "@/Services/WidgetService";

const calculator = WidgetService.Calculator;
const route = useRoute();
const toolDockOpened = ref(false);
const direction = ref(0);
const tooldock = ref(null);
const tooldockButton = ref(null);

const menus = ref([
  {
    label: "Accueil",
    route: { name: "Home" },
    icon: "home",
  },
  {
    label: "Portfolio",
    route: { name: "Portfolio" },
    icon: "query_stats",
  },
  {
    label: "Mon compte",
    route: { name: "Account" },
    icon: "person",
  },
  {
    label: "Sandbox",
    route: { name: "Sandbox" },
    icon: "construction",
  },
]);

const routeMenuIndex = computed(() => {
  const foundIndex = menus.value.findIndex(
    (menu) => menu.route.name === route.name,
  );
  return foundIndex > -1 ? foundIndex : 0;
});
const indicatorStyle = computed(() => ({
  left: `calc(${routeMenuIndex.value} * ${100 / (menus.value.length + 1)}%)`,
  width: `calc(${100 / (menus.value.length + 1)}%)`,
  transform: "translateX(-50%);",
}));

const toggleDock = (e) => {
  e.preventDefault();
  e.stopPropagation();
  toolDockOpened.value = !toolDockOpened.value;
};

const toggleApp = () => {
  calculator.toggle();
  toolDockOpened.value = false;
};

onClickOutside(tooldock, (e) => {
  if (toolDockOpened.value) {
    if (
      e.target !== tooldockButton.value &&
      !e.target.closest(".navbar-button")
    ) {
      toolDockOpened.value = false;
    }
  }
});

watch(
  () => routeMenuIndex.value,
  (oldValue, newValue) => {
    animate(
      (value) => {
        direction.value = value;
      },
      oldValue < newValue ? -30 : 30,
      290,
      easingFunctions.easeOutBack,
      true,
    );
  },
);

const hasFab = ref(false);

watch(route, () => {
  hasFab.value = !!document.querySelector(".fab");
});

onMounted(() => {
  let elements = [...document.querySelectorAll(".tool-dock-app")].reverse();

  elements.forEach((item, index) => {
    item.style.transitionDelay = index * (200 / elements.length) + "ms";
  });
});
</script>
