<template>
    <div>
        <div class="mb-xl">
            <input type="checkbox" v-model="fetchFromWeb"></input>
            Chercher sur coinmarketcap
        </div>

        <div ref="divtest" class="test"></div>


        <button @click="fetchTokens" class="py-md px-xl">Fetch</button>
        <!-- <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }} 
        </pre>
        <pre style="background: rgb(50 73 75 / 95%); max-height: 400px; overflow-y: auto;" class="mb-md">
            {{ response }}
        </pre> -->

    </div>
</template>

<script setup>
import { coinmarketcapApi } from "@/plugins/axios"

const fetchFromWeb = ref(false)

const response = ref(null)

console.log(
    // window.navigator.contacts.select(['name', 'email'], { multiple: true })
    // window.navigator.contacts.getProperties().then(t => console.log(t))
)

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



import useTouch from "@/composables/useTouch"

const divtest = ref()
const touchable = useTouch(divtest)

touchable.onTouch((e) => {
    console.log("in 'onTouch' callback")
})
touchable.onLongTouch((e) => {
    console.log("in 'onLongTouch' callback")
})
touchable.onDoubleTap((e) => {
    console.log("in 'onDoubleTap' callback")
})
touchable.onDragStart((e) => {
    console.log("in 'onDragStart' callback")
})
touchable.onDragEnd((e) => {
    console.log("in 'onDragEnd' callback")
})
touchable.onDrag((e) => {
    console.log("in 'onDrag' callback")
})
touchable.onTap((e) => {
    console.log("in 'onTap' callback")
})


// touchable.onLongTouch((e) => {
//     console.log("in 'onLongTouch' callback")
// }, { vibrate: true }) // Ouais mais là vu que je save les callback en interne, la valeur ne sera pas réactive ?

</script>

<style scoped>
.test {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, .5)
}
</style>