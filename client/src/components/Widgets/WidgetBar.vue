<template>
  <Toolbar
    :icon="icon"
    :title="title"
    :items="items"
    style="border-radius: 16px 16px 0 0"
  >
  </Toolbar>
</template>

<script setup>
import Toolbar from "@/components/Toolbar.vue";

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  minimized: {
    type: Boolean,
    default: false,
  },
  maximized: {
    type: Boolean,
    default: false,
  },
  closed: {
    type: Boolean,
    default: false,
  },
});

const items = ref([
  {
    label: "Cacher",
    icon: "minimize",
    disabled: props.minimized,
    onClick: () => emit("minimize"),
  },
  // {
  //     label: "Agrandir",
  //     icon: "maximize",
  //     disabled: props.maximized,
  //     onClick: () => emit("maximize")
  // },
  {
    label: "Ferme",
    icon: "close",
    // disabled: props.closed,
    onClick: () => emit("close"),
  },
]);

const emit = defineEmits(["minimize", "maximize", "close"]);
</script>
