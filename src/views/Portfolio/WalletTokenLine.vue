<template>
  <div
    class="border-t border-white/10 active:bg-white/10"
    @click="openDetails"
  >
    <div class="flex items-center justify-between gap-4 p-4">
      <div class="flex items-center gap-4">
        <CIcon :token="aggregate.token"></CIcon>
        <div class="flex flex-col gap-1">
          <div>{{ aggregate.token.label }}</div>
          <div class="text-white/50">
            {{ tokenPrice(aggregate) }}
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end gap-1">
        {{ amount(aggregate) }}
        <div class="">
          {{ assets(aggregate) }}
        </div>
      </div>
    </div>
    <WalletTokenDetail
      ref="detailsSection"
      :aggregate="aggregate"
    ></WalletTokenDetail>
  </div>
</template>

<script setup>
import useTokenListStore from "@/plugins/stores/TokenList";

import { amount as calculateAmount } from "@/utils/Token";

const props = defineProps({
  aggregate: {
    type: Object,
    default: null,
  },
});

const tokenListStore = useTokenListStore();

const assets = (agg) => {
  return calculateAmount(
    agg.cumulativeAmount * tokenListStore.prices[agg.token.id],
  );
};

const amount = (agg) => {
  return calculateAmount(agg.cumulativeAmount, true);
};

const tokenPrice = (agg) => {
  return calculateAmount(tokenListStore.prices?.[agg.token.id] || 0, false, 4);
};

const detailsSection = ref();
const openDetails = () => {
  detailsSection.value?.toggle();
};
</script>
