<template>

    <Tabs>
        <Tab title="Portefeuille" anchor="wallet">
            <PortfolioWallet></PortfolioWallet>
        </Tab>
        <Tab title="Historique" anchor="history">
            <PortfolioHistory></PortfolioHistory>
        </Tab>
    </Tabs>
</template>

<script setup>

import PortfolioWallet from "./Wallet.vue"
import PortfolioHistory from "./History.vue"

import Tabs from "@/components/Tabs.vue"
import Tab from "@/components/Tab.vue"

</script>
