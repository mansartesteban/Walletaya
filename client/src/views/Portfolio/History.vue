<template>
    Wallet
    <template v-for="transaction in history">
        <div>
            <CIcon :token="transaction.token"></CIcon>
            {{ transaction.amount }}
        </div>
    </template>
</template>

<script setup>
import useDatabase from "@/composables/useDatabase"
import CIcon from "@/components/CIcon.vue"

const db = useDatabase().database.value
const store = db.getStore("transactions")
const history = ref([])

onMounted(() => {
    history.value = store?.getAll().map(a => a.value)
})
</script>