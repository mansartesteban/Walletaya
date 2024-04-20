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
  --drawer-touch-height: 4px;

  position: fixed;
  z-index: 200000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  pointer-events: none;

  transition: top var(--transition-menus-duration)
    var(--transition-menus-timing);

  &.opened {
    pointer-events: all;
    > .drawer-backdrop {
      opacity: 1;
    }
    > .drawer-view {
      top: 0;
    }
  }

  > .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.33);
    transition: opacity var(--transition-menus-duration)
      var(--transition-menus-timing);
  }

  > .drawer-view {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    box-shadow: var(--shadow);
    max-height: 100%;
    width: 100%;
    top: 100%;
    transition: top var(--transition-menus-duration)
      var(--transition-menus-timing);

    > .scrollable {
      padding: var(--md);
      height: calc(100% - 2 * var(--md) - var(--drawer-touch-height));
      overflow-y: auto;
    }

    > .drawer-touch {
      height: var(--drawer-touch-height);
      width: 32px;
      background: rgba(255, 255, 255, 0.25);
      margin: var(--md) auto;
      border-radius: var(--border-radius);
    }
  }
}
</style>
