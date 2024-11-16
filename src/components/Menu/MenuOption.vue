<template>
  <Btn
    @click="onOptionClicked"
    :flat="!selected"
    class="flex items-center gap-4 p-4 user-select-none h-12 [&.selected]:bg-primary [&.selected]:border-t [&.selected]:border-b border-white/20 mt-[-1px] drop-shadow-md"
    :class="{ selected }"
  >
    <slot
      name="option-icon"
      v-bind="{ option: option, selected }"
    >
      <span
        v-if="computedOption.icon"
        class="mi"
        >{{ computedOption.icon }}</span
      >
    </slot>

    <slot
      name="option-label"
      v-bind="{ option: option, selected }"
    >
      <div
        v-if="computedOption.label"
        class="text-ellipsis overflow-clip whitespace-nowrap w-0 flex-1"
      >
        {{ computedOption.label }}
      </div>
    </slot>
  </Btn>
</template>

<script setup>
import { useOption } from "./useOption";

const props = defineProps({
  option: {
    type: [Object, Number, Array, Boolean, String],
    validator: (option) => {
      option = useOption(option);
      return (
        ![undefined, null].includes(option.value) &&
        ![undefined, null].includes(option.label)
      );
    },
  },
  model: {
    type: [Object, Number, Array, Boolean, String],
    validator: (option) => {
      option = useOption(option);
      return (
        ![undefined, null].includes(option.value) &&
        ![undefined, null].includes(option.label)
      );
    },
  },
});

const emit = defineEmits(["click"]);

const computedOption = computed(() => useOption(props.option));
const computedModel = computed(() => useOption(props.model));
const selected = computed(
  () => computedOption.value.value === computedModel.value.value,
);

const onOptionClicked = () => {
  if (computedOption.value.callback) {
    computedOption.value.callback(computedOption.value);
  }
  emit("click", props.option);
};
</script>
