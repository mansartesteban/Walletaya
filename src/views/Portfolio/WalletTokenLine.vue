<template>
  <div class="transaction-line" @click="detailsOpened = !detailsOpened">
    <div
      class="flex align-items-center justify-content-space-between gap-md p-md"
    >
      <div class="flex align-items-center gap-md">
        <CIcon :token="tokenLine.token.id"></CIcon>
        <div class="flex flex-column gap-xs">
          <div>{{ tokenLine.token.label }}</div>
          <div class="sublabel">
            {{ amount(tokenStore.getTokenPrice(tokenLine.token)) }}
          </div>
        </div>
      </div>
      <div class="flex flex-column align-items-end gap-xs">
        {{ amount(tokenLine.amount, true) }}
        <div class="sublabel">
          {{
            amount(
              tokenLine.cumulativeAmount *
                tokenStore.getTokenPrice(tokenLine.token)
            )
          }}
        </div>
      </div>
    </div>
    <WalletTokenDetail
      v-model:opened="detailsOpened"
      :walletToken="tokenLine"
    ></WalletTokenDetail>
  </div>
</template>

<script setup>
import CIcon from "@/components/CIcon.vue";
import WalletTokenDetail from "./WalletTokenDetail.vue";

import useTokenStore from "@/plugins/stores/Token";

import { amount } from "@/utils/Token";

const props = defineProps({
  tokenLine: {
    type: Object,
    default: null,
  },
});

const detailsOpened = ref(false);

const tokenStore = useTokenStore();
</script>
