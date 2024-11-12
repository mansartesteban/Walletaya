<template>
  <div class="toggle flex w-full h-full">
    <div
      v-for="item in items"
      class="item flex items-center justify-center flex-1 text-center px-4 py-2 text-white/50 border-primary [&.active]:text-white [&.active]:bg-primary [&:first-child]:border-t [&:first-child]:border-b [&:first-child]:border-l [&:first-child]:rounded-l-2xl [&:last-child]:border-t [&:last-child]:border-r [&:last-child]:border-b [&:last-child]:rounded-r-2xl [&:not(:first-child):not(:last-child)]:border-t [&:not(:first-child):not(:last-child)]:border-b"
      :class="{ active: item.value === model?.value }"
      @click="selectItem(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});
const model = defineModel({
  get: (v) => {
    return props.items?.find((item) => item.value === v);
  },
  set: (v) => {
    return v.value;
  },
});

function selectItem(item) {
  model.value = item;
}

onMounted(() => {
  if (model.value === undefined) {
    model.value = props.items[0];
  }
});
</script>
