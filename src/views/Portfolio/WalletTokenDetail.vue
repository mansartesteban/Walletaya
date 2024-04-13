<template>
  <div class="wallet-token-detail flex flex-column gap-sm" :class="{ opened }">
    <div class="detail">
      <span class="sublabel">Smoothed. Price :</span>
      {{ amount(smoothedPrice) }}
    </div>
    <div class="detail">
      <span class="sublabel">Avg. Buy Price :</span>
      {{ amount(averageBuyPrice) }}
    </div>
    <div class="detail">
      <span class="sublabel">Invested :</span>
      {{ amount(invested) }}
    </div>
    <div class="detail">
      <span class="sublabel">Var. : </span>
      <span :class="priceVariation > 0 ? 'positive' : 'negative'">
        {{ priceVariation > 0 ? "+" : ""
        }}{{ (priceVariation * 100).toFixed(2) }} %
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Profit. : </span>
      <span :class="profit > 0 ? 'positive' : 'negative'">
        {{ profit > 0 ? "+" : "" }}{{ amount(profit) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { amount } from "@/utils/Token";

const props = defineProps({
  walletToken: {
    type: Object,
  },
});

const opened = defineModel("opened");

const smoothedPrice = computed(() => {
  return props.walletToken.value / props.walletToken.cumulativeAmount;
});

const averageBuyPrice = computed(() => {
  return props.walletToken.value / props.walletToken.cumulativeBuyAmount;
});

const profit = computed(() => {
  return (
    props.walletToken.cumulativeAmount * props.walletToken.token.marketValue -
    invested.value
  );
});

const priceVariation = computed(() => {
  return (
    (props.walletToken.cumulativeAmount * props.walletToken.token.marketValue -
      props.walletToken.value) /
    props.walletToken.value
  );
});

const invested = computed(() => {
  return props.walletToken.value;
});
</script>
