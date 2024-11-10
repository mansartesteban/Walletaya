<template>
  <div
    class="btn flex flex-1 align-items-center justify-content-center gap-md"
    @click="onClick"
    :class="[
      severity,
      {
        flat,
        disabled,
        elevated,
        fab,
        icon,
        rounded,
        glass: fab,
        'icon-reverse': iconReverse,
        'icon-only': icon && !label && !$slots.default,
      },
      size ? `size-${size}` : '',
    ]"
  >
    <div v-if="label || $slots.default" class="btn-label">
      <slot>{{ label }}</slot>
    </div>
    <Icon v-if="icon">{{ icon }}</Icon>
    <div class="ripple" :class="{ active: ripple.state }"></div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";

const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  iconReverse: {
    type: Boolean,
    default: false,
  },
  flat: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  elevated: {
    type: Boolean,
    default: false,
  },
  fab: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: null,
    validator: (v) => ["xs", "sm", "md", "lg", "xl"].includes(v),
  },
  severity: {
    type: String,
    default: "primary",
    validator: (v) => {
      return [("primary", "success", "warning", "error", "info")];
    },
  },
});

const emit = defineEmits(["click"]);

const ripple = ref({
  state: false,
  x: 0,
  y: 0,
});

let rippleTimeout = null;

function onClick(e) {
  ripple.value.state = true;
  ripple.value.x = [e.clientX - e.target.offsetLeft, "px"].join("");
  ripple.value.y = [e.clientY - e.target.offsetTop, "px"].join("");

  if (rippleTimeout) {
    clearTimeout(rippleTimeout);
  }
  setTimeout(() => (ripple.value.state = false), 300); // - TOFIX

  emit("click", e);
}
</script>
