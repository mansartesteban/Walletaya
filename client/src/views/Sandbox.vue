<template>
    <div class="mb-xl">
        <input type="checkbox" v-model="fetchFromWeb"></input>
        Chercher sur coinmarketcap
    </div>
    <button @click="fetchTokens" class="py-md px-xl ">Fetch</button>
    <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;">
        {{ response }}
    </pre>
</template>

<script setup>
import { coinmarketcapApi } from "@/plugins/axios"

const fetchFromWeb = ref(false)

const response = ref(null)

async function fetchTokens() {

    if (fetchFromWeb.value) {
        response.value = (await coinmarketcapApi.get("/v1/cryptocurrency/listings/latest", {
            headers: {
                "X-CMC_PRO_API_KEY": "524d4c13-97d5-41ea-bc66-5c861259bd92",
            },
        })).data
    } else {
        response.value = (await import("@/endpoints/cryptocurrency-listing-latest.json")).data
    }

}

</script>