<template>
  <div
    class="wheel-picker wheel-selector-wrapper input flex flex-1 flex-column align-items-center scroll-snap-y p-0"
  >
    <div
      ref="scroller"
      class="wheel-selector-scroller flex flex-column align-items-center scroll-snap-y"
    >
      <div class="wheel-selector-item"></div>
      <div
        class="wheel-selector-item"
        :class="{ selected: index === model }"
        v-for="(item, index) in computedItems"
      >
        {{ item.label }}
      </div>
      <div class="wheel-selector-item"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  returnIndex: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change"]);

const computedItems = computed(() => {
  return props.items.map((item) => {
    if (["string", "number"].includes(typeof item)) {
      return {
        label: item,
        value: item,
      };
    }
    return item;
  });
});

const model = defineModel({
  get: (v) => computedItems.value.findIndex((item) => item.value === v),
  set: (v) => computedItems.value[v].value,
  default: null,
});

const scroller = ref(null);
const freezeScrollHandler = ref(false);
const freezeModelUpdate = ref(false);

const itemHeight = 32;

const unfreezeScrollHandler = useDebounceFn(() => {
  freezeScrollHandler.value = false;
}, 150);
const unfreezeModelUpdate = useDebounceFn(() => {
  freezeModelUpdate.value = false;
}, 150);
const repositionScroll = (newValue) => {
  if (freezeModelUpdate.value !== true) {
    freezeScrollHandler.value = true;
    nextTick(() => (scroller.value.scrollTop = newValue * itemHeight));
    unfreezeScrollHandler();
  }
};

watch(model, repositionScroll);
onMounted(() => {
  scroller.value.addEventListener("scroll", (e) => {
    if (freezeScrollHandler.value !== true) {
      freezeModelUpdate.value = true;
      let index = Math.round(e.target.scrollTop / itemHeight);
      if (index === props.items.length) {
        index = props.items.length - 1;
      }
      model.value = index;
      emit("change", index);
      unfreezeModelUpdate();
    }
  });
});
</script>

<style scoped lang="scss">
.wheel-selector-wrapper {
  --item-height: calc(v-bind("itemHeight") * 1px);
  position: relative;
  height: calc(var(--item-height) * 3);

  &::before,
  &::after {
    z-index: 1;
    content: "";
    position: absolute;
    height: var(--item-height);
    width: 100%;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  .wheel-selector-scroller {
    overflow-y: scroll;
    height: calc(var(--item-height) * 3 + var(--md) * 2);
    width: 100%;

    .wheel-selector-item {
      display: flex;
      align-items: center;
      padding: var(--md);
      scroll-snap-align: start;
      min-height: var(--item-height);
      max-height: var(--item-height);
      transform: scale(1.25);

      transition: color var(--transition-timing) var(--transition-duration),
        transform var(--transition-timing) var(--transition-duration);
      &:not(.selected) {
        color: rgba(255, 255, 255, 0.2);
        transform: scale(0.75);
      }
    }
  }
}
</style>
