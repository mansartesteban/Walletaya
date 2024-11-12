<template>
  <div
    class="wheel-picker wheel-selector-wrapper relative flex flex-1 flex-col items-center p-0 h-24 bg-black/35 outline outline-1 outline-primary rounded-2xl py-2 px-4 before:content-[''] before:z-[1] before:absolute before:h-4 before:w-full before:t-0 after:content-[''] after:z-[1] after:absolute after:h-4 after:w-full after:b-0"
  >
    <div
      ref="scroller"
      class="wheel-selector-scroller flex flex-col items-center snap-y snap-mandatory overflow-y-scroll h-24 w-full"
    >
      <div
        class="wheel-selector-item flex items-center p-4 snap-start min-h-4 max-h-4 scale-125 [&:not(.selected)]:text-white/20 [&:not(.selected)]:scale-75"
      ></div>
      <div
        class="wheel-selector-item flex items-center p-4 snap-start min-h-4 max-h-4 scale-125 [&:not(.selected)]:text-white/20 [&:not(.selected)]:scale-75"
        :class="{ selected: index === model }"
        v-for="(item, index) in computedItems"
      >
        {{ item.label }}
      </div>
      <div
        class="wheel-selector-item flex items-center p-4 snap-start min-h-4 max-h-4 scale-125 [&:not(.selected)]:text-white/20 [&:not(.selected)]:scale-75"
      ></div>
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
