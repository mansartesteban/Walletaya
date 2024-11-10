<template>
  <Tabs>
    <Menu
      :options="[{ label: 'Portfolio 1', value: 1 }]"
      full-width
      class="m-md"
    >
      <template #activator-label="{ option }">{{ option?.label }}</template>
    </Menu>
    <Tab title="Historique" anchor="history2" noGutters>
      <PortfolioHistory></PortfolioHistory>
    </Tab>
    <Tab title="Portefeuille" anchor="wallet" noGutters>
      <PortfolioWallet></PortfolioWallet>
    </Tab>
  </Tabs>
</template>

<script setup>
import PortfolioWallet from "./Wallet.vue";
import PortfolioHistory from "./History.vue";

import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import Menu from "@/components/Menu.vue";

import database from "@/plugins/database";
import { getToken } from "@/utils/Token";
import useWalletStore from "@/plugins/stores/Wallet";

const walletStore = useWalletStore();
const store = database.getStore("transactions");

onMounted(() => {
  walletStore.setHistory(
    store?.getAll().map((transaction) => ({
      ...transaction.value,
      creditToken: getToken(transaction.value.creditToken),
      debitToken: getToken(transaction.value.debitToken),
      id: transaction.id,
    }))
  );

  store.onSave(() => {
    walletStore.setHistory(
      store?.getAll().map((transaction) => ({
        ...transaction.value,
        creditToken: getToken(transaction.value.creditToken),
        debitToken: getToken(transaction.value.debitToken),
        id: transaction.id,
      }))
    );
  });
  store.onDelete(() => {
    walletStore.setHistory(
      store?.getAll().map((transaction) => ({
        ...transaction.value,
        creditToken: getToken(transaction.value.creditToken),
        debitToken: getToken(transaction.value.debitToken),
        id: transaction.id,
      }))
    );
  });
});
</script>
