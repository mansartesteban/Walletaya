<template>
  <div class="drawer" :class="{ opened }">
    <div class="drawer-backdrop" @click="opened = false"></div>
    <div
      ref="drawerView"
      class="drawer-view glass"
      :style="opened ? computedStyle : ''"
    >
      <div
        @touchmove="onDrag"
        @touchstart="onDragStart"
        @touchend="onDragEnd"
        ref="drawerTouch"
        class="drawer-touch"
      ></div>

      <div class="scrollable">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const opened = defineModel("opened");

const drawerView = ref(null);
const drawerTouch = ref(null);

const originalBox = ref(null);
const top = ref(0);
const lastTop = ref(0);

const onDragStart = (e) => {
  let box = e.target.getBoundingClientRect();
  originalBox.value = box;
};
const onDragEnd = (e) => {
  top.value > lastTop.value ? close() : open();
  originalBox.value = null;
};
const onDrag = (e) => {
  e.preventDefault();
  lastTop.value = top.value;
  top.value = e.changedTouches[0].clientY;
};

const open = () => {
  opened.value = true;
  top.value = 0;
};
const close = () => {
  opened.value = false;
  top.value = 0;
};

const computedStyle = computed(() => ({
  top: `${Math.max(top.value - (originalBox.value?.top || 0), 0)}px`,
}));

defineExpose({
  close,
  open,
});
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
      padding: var(--md);
      // border: 1px dashed red;

      &::before {
        position: absolute;
        content: "";
        height: var(--drawer-touch-height);
        width: 32px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: var(--border-radius);
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
