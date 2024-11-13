<template>
  <component
    :is="icon"
    :class="[size, color]"
    class="[&.xs]:h-2 [&.xs]:w-2 [&.sm]:h-4 [&.sm]:w-4 [&.md]:h-6 [&.md]:w-6 [&.lg]:h-8 [&.lg]:w-8 [&.xl]:h-10 [&.xl]:w-10 [&.2xl]:h-12 [&.2xl]:w-12 [&.success]:text-green-500 [&.error]:text-red-500 [&.info]:text-sky-500 [&.warning]:text-amber-500"
  >
  </component>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "sm",
    validator: (v) => {
      return ["xs", "sm", "md", "lg", "xl", "2xl"].includes(v);
    },
  },
  color: {
    type: String,
    validator: (v) => ["success", "error", "warning", "info"].includes(v),
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
