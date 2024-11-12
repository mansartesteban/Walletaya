<template>
  <div
    ref="buttonElement"
    class="relative select-none overflow-clip flex flex-1 items-center justify-center gap-4 [&:not(.rounded-full)]:rounded-2xl p-4 cursor-pointer text-center [&.fab]:fixed [&.fab]:right-4 [&.fab]:bottom-[calc(1rem+64px)] [&.fab]:drop-shadow-lg [&.fab]:rounded-full [&.fab]:w-16 [&.fab]:h-16 [&.fab]:flex [&.fab]:items-center [&.fab]:justify-center [&.fab]:bg-primary [&.icon-only]:flex-none [&.primary]:bg-primary [&.success]:bg-green-600 [&.warning]:bg-amber-600 [&.error]:bg-red-600 [&.info]:bg-sky-600 [&.flat]:bg-none"
    @click="onClick"
    :class="[
      severity,
      {
        flat,
        disabled,
        elevated,
        fab,
        icon,
        'rounded-full': rounded || fab,
        glass: fab,
        'icon-reverse': iconReverse,
        'icon-only': icon && !label && !$slots.default,
      },
      size ? `h-${computedSize} w-${computedSize}` : '',
    ]"
  >
    <div
      v-if="label || $slots.default"
      class="whitespace-nowrap text-ellipsis overflow-hidden"
    >
      <slot>{{ label }}</slot>
    </div>
    <Icon
      v-if="icon"
      :size="iconSize"
      >{{ icon }}</Icon
    >
    <div
      ref="rippleElement"
      class="ripple hidden absolute bg-white/25 rounded-full w-4 h-4 [&.active]:block -translate-x-1/2 -translate-y-1/2"
      :class="{ active: ripple.state }"
    ></div>
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
  rounded: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: null,
    validator: (v) => ["xs", "sm", "md", "lg", "xl", "2xl"].includes(v),
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

const sizes = {
  xs: "2",
  sm: "4",
  md: "8",
  lg: "12",
  xl: "16",
  "2xl": 20,
};

const computedSize = computed(() => {
  return sizes[props.size];
});

const rippleElement = ref();
const buttonElement = ref();

function onClick(e) {
  ripple.value.state = false;
  setTimeout(() => {
    ripple.value.state = true;
    ripple.value.x = [e.clientX - buttonElement.value.offsetLeft, "px"].join(
      "",
    );
    ripple.value.y = [e.clientY - buttonElement.value.offsetTop, "px"].join("");
  }, 0);
  emit("click", e);
}

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
