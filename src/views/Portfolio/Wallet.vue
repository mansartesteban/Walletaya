<template>
  <div class="flex flex-column">
    <template v-for="aggregate in aggregations">
      <WalletTokenLine :aggregate="aggregate"></WalletTokenLine>
    </template>
  </div>
</template>

<script setup>
import WalletTokenLine from "./WalletTokenLine.vue";
import useWalletStore from "@/plugins/stores/Wallet";

const walletStore = useWalletStore();

const aggregations = computed(() => walletStore.aggregatedTransactions);
</script>
