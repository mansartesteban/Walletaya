<template>
    <div class="window">
        <WindowBar :title="title" :icon="icon" :minimized="minimized" :maximized="maximized" :closed="closed"
            @minimize="minimize" @maximize="maximize" @close="close" />
        <slot></slot>
    </div>
</template>

<script setup>

import WindowBar from "@/components/WindowBar.vue"

const props = defineProps({
    title: {
        type: String,
        default: "Application",
    },
    icon: {
        type: String,
        default: undefined
    }
})

const minimized = ref(false)
const maximized = ref(true)
const closed = ref(false)

function minimize() {

}

function maximize() {

}

function close() {

}

</script>

<style scoped>
.window {
    position: absolute;
    top: 12.5%;
    left: 12.5%;
    width: 75%;
    height: 75%;
    background: var(--primary);
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
</style>