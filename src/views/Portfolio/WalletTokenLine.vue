<template>
  <div class="transaction-line" @click="detailsOpened = !detailsOpened">
    <div
      class="flex align-items-center justify-content-space-between gap-md p-md"
    >
      <div class="flex align-items-center gap-md">
        <CIcon :token="aggregate.token.id"></CIcon>
        <div class="flex flex-column gap-xs">
          <div>{{ aggregate.token.label }}</div>
          <div class="sublabel">
            {{ tokenPrice(aggregate) }}
          </div>
        </div>
      </div>
      <div class="flex flex-column align-items-end gap-xs">
        {{ amount(aggregate) }}
        <div class="sublabel">
          {{ assets(aggregate) }}
        </div>
      </div>
    </div>
    <WalletTokenDetail
      v-model:opened="detailsOpened"
      :aggregate="aggregate"
    ></WalletTokenDetail>
  </div>
</template>

<script setup>
import CIcon from "@/components/CIcon.vue";
import WalletTokenDetail from "./WalletTokenDetail.vue";

import useTokenListStore from "@/plugins/stores/TokenList";

import { amount as calculateAmount } from "@/utils/Token";

const props = defineProps({
  aggregate: {
    type: Object,
    default: null,
  },
});

const detailsOpened = ref(false);

const tokenListStore = useTokenListStore();

const assets = (agg) => {
  return calculateAmount(
    agg.cumulativeAmount * tokenListStore.getTokenPrice(agg.token)
  );
};

const amount = (agg) => {
  return calculateAmount(agg.cumulativeAmount, true);
};

const tokenPrice = (agg) => {
  return calculateAmount(tokenListStore.getTokenPrice(agg.token), false, 4);
};
</script>
