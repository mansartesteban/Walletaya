<template>
    <div ref="widget" class="widget flex flex-column glass"
        :class="{ closed: widgetInstance.closed, moving: draggable.moving.value }" @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove" @touchend.passive="onTouchEnd">
        <WidgetBar :title="widgetInstance.title" :icon="widgetInstance.icon" :minimized="widgetInstance.minimized"
            :maximized="widgetInstance.maximized" :closed="widgetInstance.closed" @minimize="widgetInstance.onMinimize"
            @maximize="widgetInstance.onMaximize" @close="widgetInstance.close()" />
        <div class="widget-content flex flex-column flex-1">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import WidgetBar from "@/components/Widgets/WidgetBar.vue"
import useTouch from "@/composables/useTouch"
import useDrag from "@/composables/useDrag"

const props = defineProps({
    widgetInstance: {
        type: Object
    }
})

const widget = ref()
const touchable = useTouch(widget)
const draggable = useDrag(widget)


touchable.onDragStart(draggable.startDrag, { vibrate: true })
touchable.onDrag(draggable.drag)
touchable.onDragEnd(draggable.stopDrag)


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
}

.widget.moving {
    animation: widget-moving .3s ease-out;
}

@keyframes widget-moving {
    0% {
        transform: scale(1) translate(v-bind("draggable.transform.value.x"), v-bind("draggable.transform.value.y"));
    }

    50% {
        transform: scale(1.05) translate(v-bind("draggable.transform.value.x"), v-bind("draggable.transform.value.y"));
    }

    100% {
        transform: scale(1) translate(v-bind("draggable.transform.value.x"), v-bind("draggable.transform.value.y"));
    }
}



.widget.closed {
    display: none;
}
</style>