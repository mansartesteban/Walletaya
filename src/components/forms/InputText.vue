<template>
  <div
    class="input input-text"
    :class="{
      focused: isFocused,
      filled: model !== undefined && model !== null && model !== '',
    }"
    @click="focus"
  >
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      ref="input"
      type="text"
      :id="id"
      v-model="model"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="computedPlaceholder"
    />
    <div v-if="append" class="append">{{ append }}</div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid";

const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
  id: {
    type: [String, Number],
    default: () => uuid(),
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  append: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits(["focus", "blur"]);
const model = defineModel();

const isFocused = ref(false);
const input = ref();

const computedPlaceholder = computed(() =>
  isFocused.value && !model.value ? props.placeholder : ""
);

const onFocus = (e) => {
  isFocused.value = true;
  emit("focus", e);
};
const onBlur = (e) => {
  isFocused.value = false;
  emit("blur", e);
};

const focus = (e) => {
  input.value.focus();
};
</script>
