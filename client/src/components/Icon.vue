<template>
    <component :is="icon" width="24"></component>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const slot = useSlots()

const icon = computed(() => {
    let iconName = slot.default()[0].children.split("-").map(splitted => splitted[0].toUpperCase() + splitted.slice(1).toLowerCase()).join("")
    return defineAsyncComponent(() => import(`./icons/${iconName}.vue`))
})
</script>