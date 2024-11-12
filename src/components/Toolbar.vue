<template>
  <div
    class="toolbar flex align-items-center justify-content-space-between py-xs px-sm"
  >
    <div class="toolbar-left flex align-items-center justify-content-start">
      <Icon>{{ icon }}</Icon>
    </div>
    <div class="toolbar-middle flex align-items-center justify-content-center">
      <div class="toolbar-title">{{ title }}</div>
    </div>
    <div
      class="toolbar-right flex align-items-center justify-content-end gap-xs"
    >
      <Btn
        v-for="item in items"
        @click="item.onClick"
        :icon="item.icon"
        :disabled="item.disabled"
        flat
      ></Btn>
    </div>
  </div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import Icon from "@/components/Icon.vue";

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: "Widget",
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.toolbar-middle {
  min-width: 0;
}

.toolbar-title {
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
