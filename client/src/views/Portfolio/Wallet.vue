<template>
    <div class="flex flex-column gap-md">
        <!-- {{ history.map(h => h.value) }} -->
        <div class="flex gap-md">
            <InputNumber v-model="toAmount" label="Montant" class="min-width-0 flex-1" :append="selectedTokenTo?.value">
            </InputNumber>
            <TokenPicker v-model="selectedTokenTo"></TokenPicker>
        </div>
        <div class="flex gap-md align-items-center text-sm">
            <InputNumber v-model="toValue" label="Valeur" class="min-width-0 flex-1" append="USDT"></InputNumber>
        </div>
        <Toggle v-model="buying" :items="buyOrSellItems"></Toggle>
        <div class="amount-display flex align-items-center gap-xs"
            :class="buying.value === 'buy' ? 'positive' : 'negative'">
            <div>{{ buying.value === 'buy' ? '+' : '-' }}</div>
            <div>{{ computedAmount }}</div>
            <div>USTD</div>
        </div>
        <Btn @click="save" class="p-md">Ajouter</Btn>
    </div>
</template>

<script setup>
import useDatabase from "@/composables/useDatabase"
import Btn from "@/components/Btn.vue"
import InputNumber from "@/components/forms/InputNumber.vue"
import TokenPicker from "@/components/TokenPicker.vue"
import Toggle from "@/components/forms/Toggle.vue"
import { v4 as uuid } from "uuid"
import { onMounted } from "vue"

const toAmount = ref()
const toValue = ref(1)
const selectedTokenTo = ref(null)

const buyOrSellItems = ref([{ label: 'Acheter', value: 'buy' }, { label: 'Vente', value: 'sell' }])
const buying = ref(buyOrSellItems.value[0])

const db = useDatabase().database.value
const store = db.getStore("transactions")
const history = ref([])

const computedAmount = computed(() => {
    let amount = 0
    if (toAmount.value && toValue.value) {
        amount = toAmount.value * toValue.value
    }

    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }).replace("$", "")
})

const save = () => {
    db.setItem(store, {
        id: uuid(),
        value: {
            toAmount: toAmount.value,
            toValue: toValue.value,
            token: selectedTokenTo.value.value
        }
    }).then(() => {
        history.value = store?.getAll()
    })
}

onMounted(() => {
    history.value = store?.getAll()
})
</script>

<style scoped lang="scss">
.amount-display {

    text-align: center;

    :first-child {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &.positive {
        color: var(--color-success);
    }

    &.negative {
        color: var(--color-error);
    }
}
</style>