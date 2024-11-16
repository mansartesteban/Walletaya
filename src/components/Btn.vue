<template>
  <div
    ref="buttonElement"
    class="relative select-none overflow-clip flex items-center justify-center gap-4 [&.full-width]:w-full [&:not(.rounded-full)]:rounded-2xl p-4 cursor-pointer text-center [&.fab]:fixed [&.fab]:right-4 [&.fab]:bottom-[calc(1rem+64px)] [&.fab]:drop-shadow-lg [&.fab]:rounded-full [&.fab]:w-16 [&.fab]:h-16 [&.fab]:flex [&.fab]:items-center [&.fab]:justify-center [&.fab]:bg-primary [&.icon-only]:flex-none [&.primary]:bg-primary [&.success]:bg-green-600 [&.warning]:bg-amber-600 [&.error]:bg-red-600 [&.info]:bg-sky-600 [&.flat]:bg-none [&.xs]:h-2 [&.xs]:w-2 [&.sm]:h-4 [&.sm]:w-4 [&.md]:h-8 [&.md]:w-8 [&.lg]:h-12 [&.lg]:w-12 [&.xl]:h-16 [&.xl]:w-16 [&.2xl]:h-20 [&.2xl]:w-20 [&.outlined]:outline [&.outlined]:outline-2 [&.outlined]:outline-primary"
    @click="onClick"
    :class="[
      severity,
      size,
      {
        flat: flat,
        disabled: disabled,
        elevated: elevated,
        fab: fab,
        icon: icon,
        outlined: outlined,
        'full-width': fullWidth,
        'rounded-full': rounded || fab,
        'icon-reverse': iconReverse,
        'icon-only': icon && !label && !$slots.default,
      },
    ]"
  >
    <slot>
      <div
        v-if="label"
        class="whitespace-nowrap text-ellipsis overflow-clip pointer-events-none w-0 flex-1"
      >
        {{ label }}
      </div>
    </slot>
    <span
      v-if="icon"
      class="mi pointer-events-none"
      >{{ icon }}</span
    >
    <div
      ref="rippleElement"
      class="ripple absolute bg-white/25 rounded-full w-4 h-4 [&:not(.active)]:hidden -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      :class="{ active: ripple.state }"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  iconSize: {
    type: String,
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
  outlined: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    deefault: false,
  },
  size: {
    type: String,
    default: "",
    validator: (v) => ["", "xs", "sm", "md", "lg", "xl", "2xl"].includes(v),
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

const rippleElement = ref();
const buttonElement = ref();

const onClick = (e) => {
  ripple.value.state = false;
  setTimeout(() => {
    if (buttonElement.value) {
      ripple.value.state = true;
      ripple.value.x = [e.offsetX, "px"].join("");
      ripple.value.y = [e.offsetY, "px"].join("");
    }
  }, 0);
  emit("click", e);
};

onMounted(() => {
  rippleElement.value.addEventListener(
    "animationend",
    () => (ripple.value.state = false),
  );
});
</script>

<style scoped lang="scss">
.ripple {
  top: v-bind("ripple.y");
  left: v-bind("ripple.x");
  animation: ripple 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

@keyframes ripple {
  0% {
    width: 0%;
    height: 0%;
    opacity: 1;
  }

  100% {
    opacity: 0;
    width: 100vh;
    height: 100vh;
  }
}
</style>
