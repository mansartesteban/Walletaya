<template>
    <div class="select flex flex-column gap-md">
        <div class="flex align-items-center justify-content-space-between">
            {{ $attrs.label }}
            <Icon>chevron-down</Icon>
        </div>
        <div class="select__option-menu flex flex-column align-item-stretch gap-sm">
            <div v-for="item in $attrs.items" class="option">{{ item.label }} ({{ item.value }})</div>
        </div>
    </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue"
</script>

<style scoped></style>

<style>
svg {
    color: white
}
</style>