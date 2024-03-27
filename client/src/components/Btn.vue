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
    border: 0;
    outline: none;
    transition: var(--transition);
    height: calc(100% - 8px);
    user-select: none;
}

.btn:active {
    transition: var(--transition);
    transform: translateY(4px);
    box-shadow: none !important;
    height: calc(100% - 12px) !important;
}

.btn.disabled {
    color: rgba(255, 255, 255, .25);
    pointer-events: none;
}

.btn:not(.flat) {
    box-shadow: var(--volume);
    background: var(--primary);
}
</style>