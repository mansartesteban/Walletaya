<template>
  <div class="input input-number" :class="{
    focused: isFocused,
    filled: model !== undefined && model !== null && model !== '',
    'no-label': !label,
  }" @click="focus">
    <label v-if="label" :for="id">{{ label }}</label>
    <input ref="input" type="number" steps="0.01" :id="id" v-model="model" @focus="isFocused = true"
      @blur="isFocused = false" :placeholder="computedPlaceholder" :disabled="readOnly" />
    <div v-if="append" class="append">{{ append }}</div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid"

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
})
const model = defineModel()

const isFocused = ref(false)
const input = ref()

const computedPlaceholder = computed(() =>
  isFocused.value && !model.value ? props.placeholder : ""
)

const focus = (e) => {
  input.value.focus()
}
</script>
