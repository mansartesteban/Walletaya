<template>
  <div
    class="group/drawer fixed z-40 top-0 left-0 right-0 bottom-0 flex flex-col justify-end pointer-events-none [&.opened]:pointer-events-auto"
    :class="{ opened }"
  >
    <div
      class="[&.opened]:opacity-100 fixed top-0 left-0 right-0 bottom-0 opacity-0 bg-black/35 transition-opacity"
      :class="{ opened }"
      @click="opened = false"
    ></div>
    <Glass
      ref="drawerView"
      class="rounded-t-2xl max-h-full top-full shadow-lg transition-[top] [&.opened]:top-0 glass w-full"
      :class="{ opened }"
      :style="opened ? computedStyle : ''"
    >
      <div
        @touchmove.passive="onDrag"
        @touchstart.passive="onDragStart"
        @touchend.passive="onDragEnd"
        ref="drawerTouch"
        class="p-4"
      >
        <Btn
          flat
          class="absolute top-0 right-4 w-8"
          @click="close"
          ><span class="mi">close</span></Btn
        >
      </div>

      <div
        class="p-4 h-[calc(100%-2rem-.25rem)] overflow-y-auto before:content-[''] before:absolute before:h-1 before:w-8 before:rounded-full before:bg-white/25 before:left-1/2 before:-translate-x-1/2 before:top-[calc(3rem/2-4px)]"
      >
        <slot></slot>
      </div>
    </Glass>
  </div>
</template>

<script setup>
import { watch } from "vue";

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

const escapeListener = (e) => {
  console.log("e", e);
  e.key.toLowerCase() === "escape" && close();
};

watch(opened, () => {
  if (opened.value) {
    window.addEventListener("keyup", escapeListener);
  } else {
    window.removeEventListener("keyup", escapeListener);
  }
});

defineExpose({
  close,
  open,
});
</script>
