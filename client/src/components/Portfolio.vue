<template>
    <div class="glass flex flex-column gap-md">
        <h2>Portfolio</h2>

        Volume d'achat
        <input type="number" v-model="model" step=".01">

        Prix de la monnaie
        <input type="number" v-model="model" step=".01">

        <Select :items="currency" label="Sélectionner une monnaie"></Select>
    </div>
</template>

<script setup>
import Select from "@/components/Select.vue"

const model = ref(0)

const currency = ref([
    {
        value: "BTC",
        icon: "",
        label: "Bitcoin",
    },
    {
        value: "TADA",
        icon: "",
        label: "TA-DA"
    },
    {
        value: "ETHFI",
        icon: "",
        label: "ETHFI"
    },
    {
        value: "EGLD",
        icon: "",
        label: "eGLD"
    },
    {
        value: "CAPS",
        icon: "",
        label: "Ternoa"
    },
    {
        value: "AI",
        icon: "",
        label: "Sleepless"
    },
    {
        value: "ETH",
        icon: "",
        label: "ETHERUM"
    },
])

</script>

<style scoped>
.glass {
    background: rgba(255, 255, 255, .2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    width: 50%;
    padding: 5rem;
}
</style>