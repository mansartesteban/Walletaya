<template>
    <Select v-model="model" :items="tokens" label="Sélectionner une monnaie" mini>
        <template #selected-option-mini="item">
            <CIcon :token="item.value"></CIcon>
        </template>
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

</template>

<script setup>
import CIcon from "@/components/CIcon.vue"
import Select from "@/components/Select.vue"
import useSettings from "@/composables/useSettings.js"
import tokens from "@/datas/tokens.js"
import { onMounted } from "vue"

const model = defineModel()

onMounted(() => {
    model.value = tokens.find(c => c.value === useSettings().defaultTokenFrom)
})
</script>