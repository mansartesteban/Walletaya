<template>
    <div class="portfolio flex flex-column gap-md">

        <div class="flex flex-column gap-md p-md">
            <h3>Achat</h3>
            <div class="flex align-items-center gap-md">
                <input type="number" v-model="tokenTo" step=".01" class="flex-1">
                <TokenPicker v-model="selectedTokenTo"></TokenPicker>
            </div>

            Prix de la monnaie
            <input type="number" v-model="priceTo" step=".01">

        </div>

        <div class="flex flex-column gap-md p-md">
            <h3>Vente</h3>
            <div class="flex align-items-center gap-md">
                <input type="number" v-model="tokenFrom" step=".01" class="flex-1">
                <TokenPicker v-model="selectedTokenFrom"></TokenPicker>
            </div>

            Prix de la monnaie
            <input type="number" v-model="priceFrom" step=".01">

        </div>

        <Btn @click="dbSave">Save</Btn>
        <Btn @click="dbGet">Get</Btn>

    </div>
</template>

<script setup>
import tokens from "@/datas/tokens"
import TokenPicker from "@/components/TokenPicker.vue"
import useSettings from "@/composables/useSettings"
import { onMounted } from "vue"
import useDatabase from "@/composables/useDatabase"
import Btn from "@/components/Btn.vue"

const tokenTo = ref(0)
const selectedTokenTo = ref()
const priceTo = ref(0)

const tokenFrom = ref(0)
const selectedTokenFrom = ref()
const priceFrom = ref(0)
const db = useDatabase().database.value

function dbSave() {
    db.setItem("user", { id: "1", value: "toto2" }).then((response) => {
        console.log("db response", response)
    })


}

function dbGet() {
    db.getItem("user", "1").then((response) => {
        console.log("db response", response)
    })
}

onMounted(() => {
    selectedTokenFrom.value = tokens.find(c => c.value === useSettings().defaultTokenTo)
})

</script>

<style scoped>
.portfolio {}
</style>