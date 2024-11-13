<template>
  <div
    ref="overlay"
    class="glass shadow-xl outline-none translate-y-2 [&.opened]:h-auto [&:not(.opened)]:border-none p-0 fixed z-[100] h-0 rounded-2xl overflow-clip before:content-[''] before:absolute before:top-0 before:left-0 before:min-h-full before:flex-1 before:w-full before:z-[-1]"
    :class="{ opened }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const opened = defineModel("opened", {
  type: Boolean,
  default: false,
});

const overlay = ref();

const open = () => {
  opened.value = true;
};

const close = () => {
  opened.value = false;
};

const toggle = () => {
  opened.value = !opened.value;
};

onClickOutside(overlay, close);

defineExpose({
  open,
  show: open,
  close,
  hide: close,
  toggle,
});
</script>
