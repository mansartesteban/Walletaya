<template>
  <div class="flex flex-column">
    <template v-for="aggregate in aggregations">
      <WalletTokenLine :aggregate="aggregate"></WalletTokenLine>
    </template>
  </div>
</template>

<script setup>
import { getToken } from "@/utils/Token";
import WalletTokenLine from "./WalletTokenLine.vue";
import useWalletStore from "@/plugins/stores/Wallet";
import database from "@/plugins/database";

const store = database.getStore("transactions");
const walletStore = useWalletStore();

const aggregations = computed(() => walletStore.aggregatedTransactions);

onMounted(() => {
  walletStore.setHistory(
    store?.getAll().map((transaction) => ({
      ...transaction.value,
      token: getToken(transaction.value.token),
      id: transaction.id,
    }))
  );

  store.onSave(() => {
    walletStore.setHistory(
      store?.getAll().map((transaction) => ({
        ...transaction.value,
        token: getToken(transaction.value.token),
        id: transaction.id,
      }))
    );
  });
  store.onDelete(() => {
    walletStore.setHistory(
      store?.getAll().map((transaction) => ({
        ...transaction.value,
        token: getToken(transaction.value.token),
        id: transaction.id,
      }))
    );
  });
});
</script>
