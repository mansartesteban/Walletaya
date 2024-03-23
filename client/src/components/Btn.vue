<template>
    <div class="btn p-xs" @click.native="$emit('click')" :class="{ flat, disabled }">
        <Icon v-if="icon">{{ icon }}</Icon>
        <slot>{{ label }}</slot>
    </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue"

const props = defineProps({
    label: {
        type: String,
        default: undefined
    },
    icon: {
        type: String,
        default: undefined
    },
    flat: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(["click"])
</script>

<style scoped>
.btn {
    border-radius: 6px;
    border: none;
    outline: none;
}

.btn.disabled {
    color: rgba(255, 255, 255, .25);
    pointer-events: none;
}

.btn:not(.flat) {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    background: rgb(50 73 75 / 95%);
}
</style>