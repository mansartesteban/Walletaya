<template>
  <InputText
    ref="input"
    type="password"
    v-bind="$attrs"
  ></InputText>
</template>

<script setup>
const props = defineProps({});

const input = ref();

defineExpose({
  focus: input.focus,
});
</script>
