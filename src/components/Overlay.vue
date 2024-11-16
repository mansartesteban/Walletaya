<template>
  <Glass
    ref="overlay"
    class="fixed shadow-xl outline-none translate-y-2 [&.opened]:h-auto [&:not(.opened)]:border-none p-0 z-[100] h-0 rounded-2xl overflow-clip before:content-[''] before:absolute before:top-0 before:left-0 before:min-h-full before:flex-1 before:w-full before:z-[-1] [&.shift-top]:top-4 [&.shift-bottom]:bottom-4 [&.shift-left]:left-4 [&.shift-right]:right-4"
    :class="{
      opened,
      'shift-top': shift.top,
      'shift-bottom': shift.bottom,
      'shift-left': shift.left,
      'shift-right': shift.right,
    }"
  >
    <slot></slot>
  </Glass>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const opened = defineModel("opened", {
  type: Boolean,
  default: false,
});

const overlay = ref();
const shift = reactive({
  top: false,
  bottom: false,
  left: false,
  right: false,
});
const localPosition = ref({ x: 0, y: 0 });

const open = () => {
  // let box = menuPanel.value.$el.getBoundingClientRect();
  // localPosition.value.x = box.left;
  // localPosition.value.y = box.top;

  opened.value = true;
  resize();
};

const close = () => {
  opened.value = false;
};

const toggle = () => {
  opened.value = !opened.value;
};

onClickOutside(overlay, close);

const resize = () => {
  nextTick(() => {
    let box = overlay.value.$el.getBoundingClientRect();

    shift.right = box.x + box.width > window.innerWidth;
    shift.bottom = box.y + box.height > window.innerHeight;
    shift.left = box.x < 16;
    shift.top = box.y < 16;
  });
};

watch(opened, resize);

defineExpose({
  open,
  show: open,
  close,
  hide: close,
  toggle,
});
</script>
