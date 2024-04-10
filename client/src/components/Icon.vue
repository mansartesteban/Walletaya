<template>
  <component :is="icon" :width="size" :height="size"></component>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },
});
const slot = useSlots();

const icon = computed(() => {
  let slotContent = slot.default()[0];
  let iconName = slotContent?.children?.split("-");
  iconName = iconName
    ? iconName
        .map((splitted) => {
          return splitted
            ? splitted[0].toUpperCase() + splitted.slice(1).toLowerCase()
            : "";
        })
        .join("")
    : "";
  return iconName?.length > 0
    ? defineAsyncComponent(() => import(`./icons/${iconName}.vue`))
    : "div";
});
</script>
