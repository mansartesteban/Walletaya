<template>
  <component
    :is="icon"
    :style="{
      height: size,
      width: size,
      color: computedColor,
    }"
  ></component>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  size: {
    type: [Number, String],
    default: "1rem",
  },
  color: {
    type: String,
    default: "white",
  },
});
const slot = useSlots();

const computedColor = computed(() => {
  let hookedColors = {
    primary: "var(--color-primary)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    error: "var(--color-error)",
    info: "var(--color-info)",
  };
  return Object.keys(hookedColors).includes(props.color)
    ? hookedColors[props.color]
    : props.color;
});

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
