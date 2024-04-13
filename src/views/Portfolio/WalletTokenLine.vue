<template>
  <div
    class="transaction-line flex align-items-center justify-content-space-between gap-md p-md"
    @click="detailsOpened = !detailsOpened"
  >
    <div class="flex align-items-center gap-md">
      <CIcon :token="tokenLine.token.value"></CIcon>
      <div class="flex flex-column gap-xs">
        <div>{{ tokenLine.token.label }}</div>
        <div class="sublabel">
          {{ amount(tokenLine.token.marketValue) }}
        </div>
      </div>
    </div>
    <div class="flex flex-column align-items-end gap-xs">
      {{ amount(tokenLine.amount, true) }}
      <div class="sublabel">
        {{ amount(tokenLine.cumulativeAmount * tokenLine.token.marketValue) }}
      </div>
    </div>
  </div>
  <WalletTokenDetail
    v-model:opened="detailsOpened"
    :walletToken="tokenLine"
  ></WalletTokenDetail>
</template>

<script setup>
import CIcon from "@/components/CIcon.vue";
import WalletTokenDetail from "./WalletTokenDetail.vue";

import { amount } from "@/utils/Token";

const props = defineProps({
  tokenLine: {
    type: Object,
    default: null,
  },
});

const detailsOpened = ref(false);
</script>
