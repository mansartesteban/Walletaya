<template>
    <div class="portfolio flex flex-column gap-md">
        <h2>Portfolio</h2>

        <div class="glass flex flex-column gap-md p-xl">
            <h3>Achat</h3>
            <div class="flex align-items-center gap-md">
                <input type="number" v-model="tokenTo" step=".01" class="flex-1">
                <TokenPicker v-model="selectedTokenTo"></TokenPicker>
            </div>

            Prix de la monnaie
            <input type="number" v-model="priceTo" step=".01">

        </div>

        <div class="glass flex flex-column gap-md p-xl">
            <h3>Vente</h3>
            <div class="flex align-items-center gap-md">
                <input type="number" v-model="tokenFrom" step=".01" class="flex-1">
                <TokenPicker v-model="selectedTokenFrom"></TokenPicker>
            </div>

            Prix de la monnaie
            <input type="number" v-model="priceFrom" step=".01">

        </div>
    </div>
</template>

<script setup>
import tokens from "@/datas/tokens.js"
import TokenPicker from "@/components/TokenPicker.vue"
import useSettings from "@/composables/useSettings.js"
import { onMounted } from "vue"

const tokenTo = ref(0)
const selectedTokenTo = ref()
const priceTo = ref(0)

const tokenFrom = ref(0)
const selectedTokenFrom = ref()
const priceFrom = ref(0)

onMounted(() => {
    selectedTokenFrom.value = tokens.find(c => c.value === useSettings().defaultTokenTo)
})

</script>

<style scoped>
.portfolio {
    /* height: 500px; */
    max-width: 75%;
    padding: 2rem;
}
</style>