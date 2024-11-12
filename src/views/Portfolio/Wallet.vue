<template>
  <div class="flex flex-col">
    <template v-for="aggregate in aggregations">
      <WalletTokenLine :aggregate="aggregate"></WalletTokenLine>
    </template>
  </div>
</template>

<script setup>
import WalletTokenLine from "./WalletTokenLine.vue";
import useWalletStore from "@/plugins/stores/Wallet";
import useTokenListStore from "@/plugins/stores/TokenList";

const walletStore = useWalletStore();
const tokenListStore = useTokenListStore();

const aggregations = computed(() =>
  Object.values(walletStore.aggregatedTransactions).sort(
    (a, b) =>
      tokenListStore.prices?.[b.token.id] - tokenListStore.prices?.[a.token.id],
  ),
);
</script>
