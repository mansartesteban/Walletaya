<template>
    <div class="select flex flex-column gap-md">
        <div class="select__header flex align-items-center justify-content-space-between" @click="opened = !opened">

            <template v-if="model">
                <div class="option flex gap-md">
                    <slot name="selected-option-icon" v-bind="model"></slot>

                    <div class="select__label">
                        <slot name="selected-option-label" v-bind="model">{{ model.label }}</slot>
                    </div>
                </div>
            </template>
            <template v-else>
                <span class="select__label">{{ $attrs.label }}</span>
            </template>
            <Icon>chevron-down</Icon>

        </div>
        <div class="select__option-menu flex flex-column align-item-stretch" :class="{ opened }">
            <template v-for="item in $attrs.items">
                <div @click.native="selectItem(item)" class="option flex gap-md"
                    :class="{ selected: model && item.value === model.value }">
                    <slot name="option-icon" v-bind="item"></slot>

                    <div class="select__label">
                        <slot name="option-label" v-bind="item">{{ item.label }}</slot>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue"

const opened = ref(false)

const model = defineModel()

function selectItem(item) {
    model.value = item
    opened.value = false
}
</script>


<style scoped>
svg {
    color: white
}
</style>