<template>
  <div
    class="message glass rounded-md flex align-items-center gap-md"
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

<style scoped lang="scss">
@import "@/assets/styles/vars";
.message {
  padding: var(--md);

  &.success {
    background: rgba($colorSuccess, 0.5);
    border-color: $colorSuccess;
  }
  &.warning {
    background: rgba($colorWarning, 0.5);
    border-color: $colorWarning;
  }
  &.error {
    background: rgba($colorError, 0.5);
    border-color: $colorError;
  }
  &.info {
    background: rgba($colorInfo, 0.5);
    border-color: $colorInfo;
  }

  &.centered {
    text-align: center;
  }
}
</style>
