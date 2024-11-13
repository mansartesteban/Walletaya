<template>
  <Select
    v-model="model"
    :options="options"
    label="Sélectionner une monnaie"
    mini
    search
    :sortFunction="sortFunction"
    :clearable="clearable"
    @changed="emit('changed', $event)"
  >
    <template #selected-option-mini-icon="{ option }">
      <CIcon :token="option"></CIcon>
    </template>

    <template #option-icon="{ option }">
      <CIcon :token="option"></CIcon>
    </template>

    <template #option-label="{ option }">
      <div class="flex flex-1 items-center justify-between">
        <div class="flex flex-1 flex-col gap-1">
          <div class="text-ellipsis leading-4">{{ option.label }}</div>
          <span class="sublabel leading-4 text-white/50">{{
            option.symbol
          }}</span>
        </div>
        <Btn
          @click.stop="starToken($event, option)"
          :icon="
            settings.favoriteTokens.includes(option.value)
              ? 'bookmark_added'
              : 'bookmark'
          "
          flat
          :style="{
            color: settings.favoriteTokens.includes(option.value)
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(255, 255, 255, .25)',
          }"
          class="-mr-4"
        ></Btn>
      </div>
    </template>
  </Select>
</template>

<script setup>
import useSettingsStore from "@/plugins/stores/Settings";
import { onMounted } from "vue";
import { getToken } from "@/utils/Token";
import useTokenStore from "@/plugins/stores/TokenList";
import { normalizeString } from "@/utils/String";

const props = defineProps({
  clearable: {
    type: Boolean,
  },
});
const settings = useSettingsStore();

const model = defineModel({
  get: (v) => getToken(v || settings.defaultToken?.value),
  set: (v) => v?.value || null,
});

const emit = defineEmits(["changed"]);

const tokenStore = useTokenStore();

const options = computed(() => tokenStore.tokenList);

const starToken = (e, token) => {
  e.stopPropagation();
  e.preventDefault();
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

  if (
    settings.favoriteTokens.includes(currentTokenValue) ||
    [currentTokenLabel, currentTokenValue, currentTokenSymbol].includes(filter)
  ) {
    return 1;
  }
  if (
    settings.favoriteTokens.includes(previousTokenValue) ||
    [previousTokenLabel, previousTokenValue, previousTokenSymbol].includes(
      filter,
    )
  ) {
    return -1;
  }
};

onMounted(() => {
  if (!props.clearable) {
    model.value = getToken(settings.defaultToken?.value);
  }
});
</script>
