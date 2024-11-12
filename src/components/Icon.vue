<template>
  <component
    :is="icon"
    :class="[size, color]"
    class="[&.xs]:h-2 [&.xs]:w-2 [&.sm]:h-3 [&.sm]:w-3 [&.md]:h-4 [&.md]:w-4 [&.lg]:h-6 [&.lg]:w-6 [&.xl]:h-8 [&.xl]:w-8 [&.2xl]:h-10 [&.2xl]:w-10 [&.success]:text-green-500 [&.error]:text-red-500 [&.info]:text-sky-500 [&.warning]:text-amber-500"
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
