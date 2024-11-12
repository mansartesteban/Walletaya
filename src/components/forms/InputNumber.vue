<template>
  <div
    class="group relative flex items-center input input-text flex-1 bg-black/35 outline outline-1 outline-[--primary-color] rounded-2xl px-4 py-2 [&.focused]:outline [&.focused]:outline-white/50"
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
      class="absolute group-[:not(.filled):not(.focused)]:-translate-y-1/2 group-[:not(.filled):not(.focused)]:text-white/65 group-[:not(.filled):not(.focused)]:top-1/2 group-[:not(.filled):not(.focused)]:text-base group-[.filled]:left-4 group-[.filled]:top-2 group-[.filled]:text-xs group-[.focused]:left-4 group-[.focused]:top-2 group-[.focused]:text-xs"
      >{{ label }}</label
    >
    <div class="flex flex-1 items-center gap-4">
      <input
        ref="input"
        type="number"
        steps="0.01"
        class="bg-transparent outline-none w-full placeholder:text-white/40 group-[:not(.no-label)]:mt-4 [&:disabled]:pointer-events-none"
        :id="id"
        v-model="model"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :placeholder="computedPlaceholder"
        :disabled="readOnly"
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
const model = defineModel();

const isFocused = ref(false);
const input = ref();

const computedPlaceholder = computed(() =>
  isFocused.value && !model.value ? props.placeholder : "",
);

const focus = (e) => {
  input.value.focus();
};
</script>
