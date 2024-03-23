<template>
    <div class="toolbar flex align-items-center justify-content-space-between py-xs px-sm">
        <div class="toolbar-left flex align-items-center justify-content-start">
            <Icon>{{ icon }}</Icon>
        </div>
        <div class="toolbar-middle flex align-items-center justify-content-center">
            {{ title }}
        </div>
        <div class="toolbar-right flex align-items-center justify-content-end gap-sm">
            <Btn v-for="item in items" @click="item.onClick" :icon="item.icon" :disabled="item.disabled" flat></Btn>
        </div>
    </div>
</template>

<script setup>
import Btn from "@/components/Btn.vue"
import Icon from "@/components/Icon.vue"

const props = defineProps({
    title: {
        type: String,
        default: undefined
    },
    icon: {
        type: String,
        default: "window"
    },
    items: {
        type: Array,
        default: () => []
    }
})
</script>