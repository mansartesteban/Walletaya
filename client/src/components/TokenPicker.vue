<template>
  <Select
    v-model="model"
    :options="tokens"
    label="Sélectionner une monnaie"
    mini
  >
    <template #selected-option-mini-icon="{ option }">
      <CIcon :token="option.value"></CIcon>
    </template>
    <!-- <template #selected-option-icon="{ option }">
      item {{ option }}
      <CIcon :token="option.value"></CIcon>
    </template> -->
    <!-- <template #selected-option-label="{ option }">
      {{ option.label }} ({{ option.value }})
    </template> -->

    <template #option-icon="{ option }">
      <CIcon :token="option?.value"></CIcon>
    </template>
    <template #option-label="{ option }">
      {{ option.label }} ({{ option.value }})
    </template>
  </Select>
</template>

<script setup>
import CIcon from "@/components/CIcon.vue";
import Select from "@/components/forms/Select.vue";
import useSettings from "@/composables/useSettings";
import tokens from "@/datas/tokens";
import { onMounted } from "vue";

const model = defineModel({
  default: { value: "BTC" },
});

onMounted(() => {
  model.value = tokens.find((c) => c.value === useSettings().defaultTokenFrom);
});
</script>
