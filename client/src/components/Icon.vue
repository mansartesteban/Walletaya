<template>
    <component :is="icon" :width="size" :height="size"></component>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
    size: {
        type: [Number, String],
        default: 24
    }
})
const slot = useSlots()

const icon = computed(() => {
    let iconName = slot.default()[0].children.split("-").map(splitted => splitted[0].toUpperCase() + splitted.slice(1).toLowerCase()).join("")
    return defineAsyncComponent(() => import(`./icons/${iconName}.vue`))
})
</script>