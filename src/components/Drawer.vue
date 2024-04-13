<template>
  <div ref="drawer" class="drawer blurry" :class="{ opened }">
    <div class="drawer-touch mb-md"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const opened = defineModel("opened");
const drawer = ref();

onClickOutside(drawer, () => (opened.value = false));
</script>

<style scoped lang="scss">
.drawer {
  position: fixed;
  bottom: -100%;
  width: 100%;
  padding: var(--md);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  z-index: 200000;
  box-shadow: var(--shadow);
  transition: bottom var(--transition-menus-duration)
    var(--transition-menus-timing);

  &.opened {
    bottom: 0;
  }

  .drawer-touch {
    height: 4px;
    width: 32px;
    background: rgba(255, 255, 255, 0.25);
    margin: 0 auto;
    border-radius: var(--border-radius);
  }
}
</style>
