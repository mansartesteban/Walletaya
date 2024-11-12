<template>
  <div
    class="glass rounded-2xl flex items-center py-2 px-4 gap-4 [&.centered]:text-center [&.success]:bg-green-500/50 [&.success]:border-green-500 [&.warning]:bg-amber-500/50 [&.warning]:border-amber-500 [&.error]:bg-red-500/50 [&.error]:border-red-500 [&.info]:bg-sky-500/50 [&.info]:border-sky-500"
    :class="[severity, { centered }]"
  >
    <Icon v-if="computedIcon">{{ computedIcon }}</Icon>

    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  centered: {
    type: Boolean,
    default: false,
  },
  severity: {
    type: String,
    default: null,
    validator: (v) => ["success", "warning", "error", "info"].includes(v),
  },
});

const computedIcon = computed(() => props.icon || props.severity);
</script>
