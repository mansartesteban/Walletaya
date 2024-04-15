<template>
  <div class="wallet-token-detail flex flex-column gap-sm" :class="{ opened }">
    <div class="detail">
      <span class="sublabel">Valeur lissée</span>
      <span class="value">
        {{ WalletAggregator.smoothedPrice(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Prix d'achat moyen</span>
      <span class="value">
        {{ WalletAggregator.averageBuyPrice(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Acheté</span>
      <span class="value">
        {{ WalletAggregator.bought(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Vendu</span>
      <span class="value">
        {{ WalletAggregator.selled(aggregate) }}
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Var.</span>
      <span class="value">
        <span
          :class="
            WalletAggregator.priceVariation(aggregate) > 0
              ? 'positive'
              : 'negative'
          "
        >
          {{ WalletAggregator.priceVariation(aggregate) > 0 ? "+" : "" }}
          {{ WalletAggregator.priceVariation(aggregate) }} %
        </span>
      </span>
    </div>
    <div class="detail">
      <span class="sublabel">Profit.</span>
      <span class="value">
        <span
          :class="
            WalletAggregator.profit(aggregate) > 0 ? 'positive' : 'negative'
          "
        >
          {{ WalletAggregator.profit(aggregate) > 0 ? "+" : "" }}
          {{ WalletAggregator.profit(aggregate) }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import useTokenStore from "@/plugins/stores/TokenList";

import WalletAggregator from "@/utils/WalletAggregator";

const props = defineProps({
  aggregate: {
    type: Object,
  },
});

const tokenStore = useTokenStore();

const opened = defineModel("opened");
</script>
