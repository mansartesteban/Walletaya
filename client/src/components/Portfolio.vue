<template>
    <div class="portfolio glass flex flex-column gap-md">
        <h2>Portfolio</h2>

        Volume d'achat
        <div class="flex align-items-center gap-md">
            <input type="number" v-model="model" step=".01" class="flex-1">
            <CIcon :token="selectedCurrency?.value"></CIcon>
        </div>

        Prix de la monnaie
        <input type="number" v-model="model" step=".01">

        <Select v-model="selectedCurrency" :items="currency" label="Sélectionner une monnaie">
            <template #selected-option-icon="item">
                <CIcon :token="item.value"></CIcon>
            </template>
            <template #selected-option-label="item">
                {{ item.label }} ({{ item.value }})
            </template>

            <template #option-icon="item">
                <CIcon :token="item.value"></CIcon>
            </template>
            <template #option-label="item">
                {{ item.label }} ({{ item.value }})
            </template>
        </Select>
    </div>
</template>

<script setup>
import Select from "@/components/Select.vue"
import CIcon from "@/components/CIcon.vue"

const model = ref(0)

const currency = ref([
    {
        value: "AI",
        label: "Sleepless"
    },
    {
        value: "BNB",
        label: "BNB",
    },
    {
        value: "BTC",
        label: "Bitcoin",
    },
    {
        value: "CAPS",
        label: "Ternoa"
    },
    {
        value: "EGLD",
        label: "MultiverseX"
    },
    {
        value: "ETH",
        label: "ETHERUM"
    },
    {
        value: "ETHFI",
        label: "ETHFI"
    },
    {
        value: "LTO",
        label: "LTO Network"
    },
    {
        value: "OM",
        label: "Mantra"
    },
    {
        value: "OOKI",
        label: "Ooki Protocol"
    },
    {
        value: "POLYX",
        label: "Polymesh"
    },
    {
        value: "TADA",
        label: "TA-DA"
    },
    {
        value: "USDT",
        label: "Tether USD"
    },
    {
        value: "VANRY",
        label: "Vanar Chain"
    },
    {
        value: "WBETH",
        label: "Wrapper Etherum"
    },
])

const selectedCurrency = ref(currency.value.find(c => c.value === "BTC"))

</script>

<style scoped>
.portfolio {
    /* height: 500px; */
    max-width: 75%;
    padding: 2rem;
}
</style>