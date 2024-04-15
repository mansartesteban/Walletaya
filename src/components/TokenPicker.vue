<template>
  <Select
    v-model="model"
    :options="options"
    label="Sélectionner une monnaie"
    mini
    @changed="emit('changed', $event)"
  >
    <template #selected-option-mini-icon="{ option }">
      <CIcon :token="option.id"></CIcon>
    </template>

    <template #option-icon="{ option }">
      <CIcon :token="option?.id"></CIcon>
    </template>

    <template #option-label="{ option }">
      <div class="flex flex-1 justify-content-space-between">
        <div>{{ option.label }}</div>
        <div>
          <span class="sublabel">{{ option.symbol }}</span>
        </div>
      </div>
    </template>
  </Select>
</template>

<script setup>
import CIcon from "@/components/CIcon.vue";
import Select from "@/components/forms/Select.vue";
import useSettingsStore from "@/plugins/stores/Settings";
import { onMounted } from "vue";
import { getToken } from "@/utils/Token";

import useTokenStore from "@/plugins/stores/TokenList";

const settings = useSettingsStore();

const model = defineModel({
  get: (v) => {
    return getToken(v || settings.defaultTokenFrom);
  },
  set: (v) => {
    return v.value;
  },
});

const emit = defineEmits(["changed"]);

const tokenStore = useTokenStore();

const options = computed(() => {
  return tokenStore.tokenList;
  // return Object.values(tokenList.value);
});

const favoriteTokens = ["tether", "ternoa", "bitcoin", "sleepless-ai", ""];
const defaultTokens = ["tether", "bitcoin", "ethereum", "solana"];

// const filterToken = (token) => {
//   if (favoriteTokens.length > 0) {
//     return token === model.value.value || favoriteTokens.includes(token.slug);
//   }

//   return token === model.value.value || defaultTokens.includes(token.slug);
// };

onMounted(() => {
  model.value = getToken(settings.defaultTokenFrom);
});
</script>
