<template>
    <div ref="window" class="window flex flex-column glass" :class="{ closed: widget.closed }"
        @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove">
        <WindowBar :title="widget.title" :icon="widget.icon" :minimized="widget.minimized" :maximized="widget.maximized"
            :closed="widget.closed" @minimize="widget.onMinimize" @maximize="widget.onMaximize"
            @close="widget.close()" />
        <div class="window-content flex flex-column flex-1">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import WindowBar from "@/components/WindowBar.vue"

const props = defineProps({
    widget: {
        type: Object
    }
})

const window = ref()
const offset = ref({
    x: 0,
    y: 0
})
const transform = ref({
    x: 0,
    y: 0
})

const originalTransform = {
    x: 0,
    y: 0,
}

function onTouchStart(e) {
    offset.value.x = e.touches[0].clientX
    offset.value.y = e.touches[0].clientY
    originalTransform.x = transform.value.x
    originalTransform.y = transform.value.y
}

function onTouchMove(e) {
    transform.value.x = originalTransform.x + e.touches[0].clientX - offset.value.x
    transform.value.y = originalTransform.y + e.touches[0].clientY - offset.value.y
    window.value.style.transform = `translate(${transform.value.x}px, ${transform.value.y}px)`
}

</script>

<style scoped>
.window {
    position: fixed;
    top: v-bind("widget.position.y");
    left: v-bind("widget.position.x");
    width: 75%;
    height: 75%;
    border-radius: 16px;
    z-index: 1;
    /* box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px; */
}

.window.closed {
    display: none;
}

.window-content {
    /* background: var(--primary); */
    /* border-radius: 1rem; */
    /* box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
}
</style>