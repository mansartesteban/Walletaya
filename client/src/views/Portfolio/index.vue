<template>
  <Tabs>
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
</script>
