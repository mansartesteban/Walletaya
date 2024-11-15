<template>
  <Btn
    @click="optionEvents.onClick(option)"
    :flat="option.value !== model?.value"
    class="flex items-center gap-4 p-4 user-select-none h-12 [&.selected]:bg-primary [&.selected]:border-t [&.selected]:border-b border-white/20 mt-[-1px] drop-shadow-md"
    :class="{
      selected: model && option.value === model.value,
    }"
  >
    <slot
      name="option-icon"
      v-bind="{ option: option }"
    >
      <span
        v-if="option.icon"
        class="mi"
        >{{ option.icon }}</span
      >
    </slot>

    <slot
      name="option-label"
      v-bind="{ option: option }"
    >
      <div
        v-if="option.label"
        class="text-ellipsis overflow-clip whitespace-nowrap min-w-0"
      >
        {{ option.label }}
      </div>
    </slot>
  </Btn>
</template>

<script setup>
const props = defineProps({
  option: {
    type: Object,
    validator: (option) => option.value && option.label,
  },
});

const emit = defineEmits(["option-clicked"]);

const selectValue = (option) => {
  if (option.callback) {
    option.callback(option);
  }
  emit("click", option);
};

const optionEvents = ref({
  onClick: selectValue,
});
</script>
