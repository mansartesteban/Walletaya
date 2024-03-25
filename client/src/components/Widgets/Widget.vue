<template>
    <div ref="widget" class="widget flex flex-column glass" :class="{ closed: widgetInstance.closed, moving }"
        @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove" @touchend.passive="onTouchEnd">
        <WidgetBar :title="widgetInstance.title" :icon="widgetInstance.icon" :minimized="widgetInstance.minimized" :maximized="widgetInstance.maximized"
            :closed="widgetInstance.closed" @minimize="widgetInstance.onMinimize" @maximize="widgetInstance.onMaximize"
            @close="widgetInstance.close()" />
        <div class="widget-content flex flex-column flex-1">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import WidgetBar from "@/components/Widgets/WidgetBar.vue"

const props = defineProps({
    widgetInstance: {
        type: Object
    }
})

const widget = ref()
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

const moving = ref(false)
const released = ref(false)

const initiateDrag = () => {
    if (released.value) {
        released.value = false;
        moving.value = false;
    } else {
        window.navigator.vibrate([25])
        moving.value = true;
        offset.value.x = e.touches[0].clientX
        offset.value.y = e.touches[0].clientY
        originalTransform.x = parseInt(transform.value.x.substr(0, transform.value.x.length - 2))
        originalTransform.y = parseInt(transform.value.y.substr(0, transform.value.y.length - 2))
    }
}

const startCallback = null

function onTouchStart(e) {
    released.value = false;
    moving.value = false;
    startCallback = setTimeout(initiateDrag ,2000) // Get the delay of android user preferences
    
}

function onTouchMove(e) {
    if (moving.value) {
        transform.value.x = [originalTransform.x + e.touches[0].clientX - offset.value.x, "px"].join("")
        transform.value.y = [originalTransform.y + e.touches[0].clientY - offset.value.y, "px"].join("")
        widget.value.style.transform = `translate(${transform.value.x}, ${transform.value.y})`
    }
}

function onTouchEnd(e) {
    released.value = true;
    moving.value = false;
    clearTimeout(startCallback)
}

</script>

<style scoped>
.widget {
    position: fixed;
    top: v-bind("widgetInstance.position.y");
    left: v-bind("widgetInstance.position.x");
    width: 75%;
    height: 75%;
    border-radius: 16px;
    z-index: 1;
    /* box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px; */
}

@keyframes widget-moving {
    0% {
        transform: scale(1) translate(v-bind("transform.x"), v-bind("transform.y"));
    }
    50% {
        transform: scale(1.05) translate(v-bind("transform.x"), v-bind("transform.y"));
    }
    100% {
        transform: scale(1) translate(v-bind("transform.x"), v-bind("transform.y"));
    }
}

.widget.moving {
    animation: widget-moving .3s ease-out;
}

.widget.closed {
    display: none;
}

.widget-content {
    /* background: var(--primary); */
    /* border-radius: 1rem; */
    /* box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
}
</style>