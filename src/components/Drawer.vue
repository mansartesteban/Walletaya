<template>
  <div class="drawer" :class="{ opened }">
    <div class="drawer-backdrop" @click="opened = false"></div>
    <div class="drawer-view glass">
      <div class="drawer-touch"></div>

      <div class="scrollable">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const opened = defineModel("opened");
</script>

<style scoped lang="scss">
.drawer {
  position: fixed;
  width: 100%;
  z-index: 200000;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
  top: 0;
  pointer-events: none;

  --drawer-touch-height: 4px;

  &.opened {
    pointer-events: all;
    .drawer-backdrop {
      min-height: 0;
      opacity: 1;
    }
  }

  .drawer-backdrop {
    transition: min-height var(--transition-menus-duration)
        var(--transition-menus-timing),
      opacity var(--transition-menus-duration) var(--transition-menus-timing);
    width: 100%;
    min-height: 100%;
    flex: 1;
    opacity: 0;
    background: rgba(0, 0, 0, 0.66);
  }

  .drawer-view {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    box-shadow: var(--shadow);
    max-height: 100%;
    // overflow-y: hidden;

    .scrollable {
      padding: var(--md);
      height: calc(100% - 2 * var(--md) - var(--drawer-touch-height));
      overflow-y: auto;
    }

    .drawer-touch {
      height: var(--drawer-touch-height);
      width: 32px;
      background: rgba(255, 255, 255, 0.25);
      margin: var(--md) auto;
      border-radius: var(--border-radius);
    }
  }
}
</style>
