<template>
  <div class="wallet-token-detail" :class="{ opened }">
    <div class="detail">
      Avg. Price :
      {{ amount(averagePrice) }}
    </div>
    <div class="detail">
      Invested :
      {{ amount(invested) }}
    </div>
    <div class="detail">
      Var. :
      {{ Math.round(priceVariation * 100, 4) }} %
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

const averagePrice = computed(() => {
  return props.walletToken.value / props.walletToken.cumulativeAmount;
});

const priceVariation = computed(() => {
  return (
    (props.walletToken.cumulativeAmount * props.walletToken.token.marketValue -
      props.walletToken.value) /
    props.walletToken.value
  );
});

const valueVariation = computed(() => {
  return priceVariation;
});

const invested = computed(() => {
  return props.walletToken.value;
});
</script>

<style scoped lang="scss">
.wallet-token-detail {
  height: 0;
  padding: 0 var(--md);
  overflow: hidden;

  transition: padding var(--transition-timing) var(--transition-duration),
    height var(--transition-timing) var(--transition-duration);

  &.opened {
    padding: var(--md);
    height: fit-content;
  }
}
</style>
