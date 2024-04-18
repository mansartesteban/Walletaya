<template>
  <div class="wallet-token-detail flex flex-column gap-sm" :class="{ opened }">
    <div class="detail">
      <span class="sublabel">Valeur lissée</span>
      <span class="value">
        {{ smoothedPrice(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Prix d'achat moyen</span>
      <span class="value">
        {{ averageCreditPrice(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Acheté</span>
      <span class="value">
        {{ credited(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Vendu</span>
      <span class="value">
        {{ debited(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Var.</span>
      <span class="value">
        <span :class="priceVariation(aggregate) > 0 ? 'positive' : 'negative'">
          {{ priceVariation(aggregate) > 0 ? "+" : "" }}
          {{ priceVariation(aggregate) }} %
        </span>
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Profit.</span>
      <span class="value">
        <span :class="profit(aggregate) > 0 ? 'positive' : 'negative'">
          {{ profit(aggregate) > 0 ? "+" : "" }}
          {{ calculateAmount(profit(aggregate)) }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import useTokenListStore from "@/plugins/stores/TokenList";

import { amount as calculateAmount } from "@/utils/Token";

const props = defineProps({
  aggregate: {
    type: Object,
  },
});

const tokenListStore = useTokenListStore();

const opened = defineModel("opened");

const smoothedPrice = (agg) => {
  return calculateAmount(agg.cumulativeAssets / agg.cumulativeAmount);
};

const averageCreditPrice = (agg) => {
  return calculateAmount(
    agg.cumulativeAssetsCredit / agg.cumulativeAmountCredit
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
</script>
