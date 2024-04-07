<template>
  <div class="input input-text" :class="{ focused: isFocused, filled: model }">
    <label v-if="label" :for="id">{{ label }}</label>
    <input type="number" steps="0.01" :id="id" v-model="model" @focus="isFocused = true" @blur="isFocused = false"
      :placeholder="computedPlaceholder" />
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
    default: undefined
  }
})
const model = defineModel()

const isFocused = ref(false)

const computedPlaceholder = computed(() =>
  isFocused.value && !model.value ? props.placeholder : ""
)
</script>
