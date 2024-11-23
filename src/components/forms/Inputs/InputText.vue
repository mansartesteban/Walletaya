<template>
  <div
    class="group group-input relative flex items-center flex-1 bg-black/35 outline outline-1 outline-[--primary-color] rounded-2xl px-4 py-2 [&.focused]:outline [&.focused]:outline-white/50"
    :class="{
      focused: isFocused,
      filled: model !== undefined && model !== null && model !== '',
      'no-label': !label,
    }"
    @click="focus"
  >
    <label
      v-if="label"
      :for="id"
      class="absolute w-full pr-8 text-ellipsis whitespace-nowrap overflow-clip group-[.group-input:not(.filled):not(.focused)]:-translate-y-1/2 group-[.group-input:not(.filled):not(.focused)]:text-white/65 group-[.group-input:not(.filled):not(.focused)]:top-1/2 group-[.group-input:not(.filled):not(.focused)]:text-base group-[.group-input.filled]:left-4 group-[.group-input.filled]:top-2 group-[.group-input.filled]:text-xs group-[.group-input.focused]:left-4 group-[.group-input.focused]:top-2 group-[.group-input.focused]:text-xs transition-all"
      >{{ label }}</label
    >
    <div class="flex flex-1 items-center gap-4">
      <input
        v-model="model"
        ref="input"
        class="bg-transparent outline-none w-full placeholder:text-white/40 group-[.group-input:not(.no-label)]:mt-4 [&:disabled]:pointer-events-none"
        :id="id"
        :placeholder="computedPlaceholder"
        :disabled="readOnly"
        :type="type"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
      <div
        v-if="append"
        class="text-ellipsis whitespace-nowrap overflow-clip"
      >
        {{ append }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid";

const props = defineProps({
  label: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: "text",
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
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["focus", "blur", "input"]);
const model = defineModel();

const isFocused = ref(false);
const input = ref();

const computedPlaceholder = computed(() =>
  isFocused.value && !model.value ? props.placeholder : "",
);

const onFocus = (e) => {
  isFocused.value = true;
  emit("focus", e);
};

const onBlur = (e) => {
  isFocused.value = false;
  emit("blur", e);
};

const onInput = (e) => {
  emit("input", e);
};

const focus = (e) => {
  input.value.focus();
};

defineExpose({
  focus,
});
</script>
