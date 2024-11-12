<template>
  <div
    ref="detailSection"
    class="wallet-token-detail flex flex-col gap-2 px-4 pb-4"
  >
    <!-- <div> -->
    <!-- agg :
      <br>
      <br>
      <pre>{{ aggregate }}</pre> -->
    <!-- </div> -->
    <div class="flex items-baseline gap-2">
      <span class="text-white/50">Valeur lissée</span>
      <span class="text-xs">
        {{ smoothedPrice(aggregate) }}
      </span>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-white/50">Prix d'achat moyen</span>
      <span class="text-xs">
        {{ averageCreditPrice(aggregate) }}
      </span>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-white/50">Prix de vente moyen</span>
      <span class="text-xs">
        {{ averageDebitPrice(aggregate) }}
      </span>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-white/50">Acheté</span>
      <span class="text-xs">
        {{ credited(aggregate) }}
      </span>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-white/50">Vendu</span>
      <span class="text-xs">
        {{ debited(aggregate) }}
      </span>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-white/50">Var.</span>
      <span class="text-xs">
        <span
          :class="
            priceVariation(aggregate) > 0 ? 'text-green-600' : 'text-red-600'
          "
        >
          {{ priceVariation(aggregate) > 0 ? "+" : "" }}
          {{ priceVariation(aggregate) }} %
        </span>
      </span>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-white/50">Profit.</span>
      <span class="text-xs">
        <span
          :class="profit(aggregate) > 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ profit(aggregate) > 0 ? "+" : "" }}
          {{ calculateAmount(profit(aggregate)) }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import useTokenListStore from "@/plugins/stores/TokenList";
import useAutoCollapse from "@mansartesteban/use-auto-collapse";

import { amount as calculateAmount } from "@/utils/Token";

const props = defineProps({
  aggregate: {
    type: Object,
  },
});

const tokenListStore = useTokenListStore();

const smoothedPrice = (agg) => {
  return calculateAmount(agg.cumulativeAssets / agg.cumulativeAmount);
};

const averageCreditPrice = (agg) => {
  return calculateAmount(
    agg.cumulativeAmountCredit !== 0
      ? agg.cumulativeAssetsCredit / agg.cumulativeAmountCredit
      : 0,
  );
};

const averageDebitPrice = (agg) => {
  return calculateAmount(
    agg.cumulativeAmountDebit !== 0
      ? agg.cumulativeAssetsDebit / agg.cumulativeAmountDebit
      : 0,
  );
};

const credited = (agg) => {
  return calculateAmount(agg.credited);
};

const debited = (agg) => {
  return calculateAmount(agg.debited);
};

const priceVariation = (agg) => {
  return (
    ((agg.cumulativeAmount * tokenListStore.getTokenPrice(agg.token) -
      agg.cumulativeAssets) /
      agg.cumulativeAssets) *
    100
  ).toFixed(2);
};

const profit = (agg) => {
  return (
    agg.cumulativeAmount * tokenListStore.getTokenPrice(agg.token) -
    agg.credited
  );
};

const detailSection = ref();
let collapsible = ref();
const toggle = () => {
  collapsible.value?.toggle();
};
onMounted(() => {
  collapsible.value = useAutoCollapse(detailSection.value, {
    openedByDefault: false,
    handleMargins: "vertical",
  });
});

defineExpose({
  toggle,
});
</script>
