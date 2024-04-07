<template>
    <div ref="select" class="select flex flex-column gap-md" :class="{ mini }">
        <div class="select__header flex align-items-center"
            :class="mini ? 'justify-content-center' : 'justify-content-space-between'" @click="toggle()">

            <template v-if="mini">
                <slot name="selected-option-mini" v-bind="model"></slot>
            </template>
            <template v-else>
                <template v-if="model">
                    <div class="option flex gap-md">
                        <slot name="selected-option-icon" v-bind="model"></slot>

                        <div class="select__label">
                            <slot name="selected-option-label" v-bind="model">{{ model.label }}</slot>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <span class="select__label">{{ label }}</span>
                </template>
                <Icon>chevron-down</Icon>
            </template>
        </div>
        <div ref="selectOptionMenu" class="select__option-menu" :class="{ opened }">
            <!-- <input> -->
            <template v-for="item in items">
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
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    label: {
        type: String,
        default: "Sélectionner une valeur"
    },
    mini: {
        type: Boolean,
        default: false
    }
})

const select = ref()

const opened = ref(false)
const model = defineModel()
const selectOptionMenu = ref()

function selectItem(item) {
    model.value = item
    close()
}

function open() {
    opened.value = true
    resize()
}


function resize() {
    let margin = 16
    let menuWidth = 240
    let menuHeight = 240

    if (selectOptionMenu.value) {

        let rect = selectOptionMenu.value.getBoundingClientRect()
        console.log("rect", { rect, margin, menuWidth, innerHeight: window.innerHeight, innerWidth: window.innerWidth })

        if (rect.left <= margin) {
            console.log("rect.left <= margin")
            selectOptionMenu.value.style.left = [margin, "px"].join("")
        }
        if (rect.top <= margin) {
            console.log("rect.top <= margin")
            selectOptionMenu.value.style.top = [margin, "px"].join("")
        }

        if (rect.left + menuWidth >= window.innerWidth - margin) {
            console.log("rect.left + menuWidth >= window.innerWidth - margin")
            selectOptionMenu.value.style.left = [window.innerWidth - (margin + menuWidth), "px"].join("")
        }
        if (rect.top + menuHeight >= window.innerHeight - margin) {
            console.log("rect.top + menuHeight >= window.innerHeight - margin")
            selectOptionMenu.value.style.top = [window.innerHeight - (margin + menuHeight), "px"].join("")
        }
    }
}

function close() {
    opened.value = false
}

function toggle() {
    opened.value ? close() : open()
}

onClickOutside(select, e => close())

</script>


<style scoped>
svg {
    color: white
}
</style>