<template>
  <Select
    v-model="model"
    :options="options"
    label="Sélectionner une monnaie"
    mini
    search
    :sortFunction="sortFunction"
    @changed="emit('changed', $event)"
  >
    <template #selected-option-mini-icon="{ option }">
      <CIcon :token="option"></CIcon>
    </template>

    <template #option-icon="{ option }">
      <CIcon :token="option"></CIcon>
    </template>

    <template #option-label="{ option }">
      <div class="flex flex-1 align-items-center justify-content-space-between">
        <div class="flex flex-1 flex-column gap-xs">
          <div class="text-ellipsis">{{ option.label }}</div>
          <span class="sublabel">{{ option.symbol }}</span>
        </div>
        <Btn
          @click.stop="starToken($event, option)"
          :icon="
            settings.favoriteTokens.includes(option.value) ? 'star' : 'star-off'
          "
          flat
          :style="{
            color: settings.favoriteTokens.includes(option.value)
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(255, 255, 255, .25)',
          }"
          class="mr-n-md"
        ></Btn>
      </div>
    </template>
  </Select>
</template>

<script setup>
import CIcon from "@/components/CIcon.vue";
import Btn from "@/components/Btn.vue";
import Select from "@/components/forms/Select.vue";
import useSettingsStore from "@/plugins/stores/Settings";
import { onMounted } from "vue";
import { getToken } from "@/utils/Token";
import useTokenStore from "@/plugins/stores/TokenList";
import { normalizeString } from "@/utils/String";

const settings = useSettingsStore();

const model = defineModel({
  get: (v) => getToken(v || settings.defaultToken.value),
  set: (v) => v?.value,
});

const emit = defineEmits(["changed"]);

const tokenStore = useTokenStore();

const options = computed(() => tokenStore.tokenList);

const starToken = (e, token) => {
  e.stopPropagation();
  settings.starToken(token);
};

const sortFunction = (previousToken, currentToken, filter) => {
  filter = normalizeString(filter);
  let previousTokenValue = normalizeString(previousToken.value);
  let previousTokenSymbol = normalizeString(previousToken.symbol);
  let previousTokenLabel = normalizeString(previousToken.label);
  let currentTokenValue = normalizeString(currentToken.value);
  let currentTokenSymbol = normalizeString(currentToken.symbol);
  let currentTokenLabel = normalizeString(currentToken.label);

  if (settings.favoriteTokens.includes(currentTokenValue)) {
    return 1;
  }
  if (settings.favoriteTokens.includes(previousTokenValue)) {
    return -1;
  }
  if (
    [currentTokenLabel, currentTokenValue, currentTokenSymbol].includes(filter)
  ) {
    return 1;
  }
  if (
    [previousTokenLabel, previousTokenValue, previousTokenSymbol].includes(
      filter
    )
  ) {
    return -1;
  }
};

onMounted(() => {
  model.value = getToken(settings.defaultToken.value);
});
</script>
