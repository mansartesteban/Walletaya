<template>
  <div class="wallet-token-detail flex flex-column gap-sm" :class="{ opened }">
    <div class="detail">
      <span class="sublabel">Prix moyen</span>
      <span class="value">
        {{ amount(smoothedPrice) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Prix d'achat moyen</span>
      <span class="value">
        {{ amount(averageBuyPrice) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Acheté</span>
      <span class="value">
        {{ amount(invested) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Vendu</span>
      <span class="value">
        {{ amount(selled) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Var.</span>
      <span class="value">
        <span :class="priceVariation > 0 ? 'positive' : 'negative'">
          {{ priceVariation > 0 ? "+" : ""
          }}{{ (priceVariation * 100).toFixed(2) }} %
        </span>
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Profit.</span>
      <span class="value">
        <span :class="profit > 0 ? 'positive' : 'negative'">
          {{ profit > 0 ? "+" : "" }}{{ amount(profit) }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { amount } from "@/utils/Token";
import useTokenStore from "@/plugins/stores/Token";

const props = defineProps({
  walletToken: {
    type: Object,
  },
});

const tokenStore = useTokenStore();

const opened = defineModel("opened");

const smoothedPrice = computed(() => {
  return props.walletToken.value / props.walletToken.cumulativeAmount;
});

const averageBuyPrice = computed(() => {
  return props.walletToken.value / props.walletToken.cumulativeBuyAmount;
});

const profit = computed(() => {
  return (
    props.walletToken.cumulativeAmount *
      tokenStore.getTokenPrice(props.walletToken.token) -
    invested.value
  );
});

const priceVariation = computed(() => {
  return (
    (props.walletToken.cumulativeAmount *
      tokenStore.getTokenPrice(props.walletToken.token) -
      props.walletToken.value) /
    props.walletToken.value
  );
});

const invested = computed(() => {
  return props.walletToken.bought;
});

const selled = computed(() => {
  return props.walletToken.selled;
});
</script>
