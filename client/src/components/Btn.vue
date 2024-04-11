<template>
    <div class="btn p-xs" @click.native="onClick" :class="{ flat, disabled }">
        <Icon v-if="icon">{{ icon }}</Icon>
        <slot>{{ label }}</slot>
        <div class="ripple" :class="{ active: ripple.state }"></div>
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

const ripple = ref({
    state: false,
    x: 0,
    y: 0
})

let rippleTimeout = null

function onClick(e) {

    ripple.value.state = true
    ripple.value.x = [e.clientX - e.target.offsetLeft, "px"].join("")
    ripple.value.y = [e.clientY - e.target.offsetTop, "px"].join("")

    if (rippleTimeout) {
        clearTimeout(rippleTimeout)
    }
    setTimeout(() => ripple.value.state = false, 300)

    emit('click')
}
</script>

<style scoped lang="scss">
.btn {
    overflow: hidden;
    border-radius: var(--border-radius);
    border: 0;
    outline: none;
    transition: var(--transition);

    font-size: 1rem;
    text-align: center;
    position: relative;

    * {
        user-select: none;
    }

    &:active {
        transition: var(--transition);
        /*transform: translateY(4px);*/
        box-shadow: none !important;
        /*height: calc(100% - 120px) !important;*/
    }

    &.disabled {
        color: rgba(255, 255, 255, .25);
        pointer-events: none;
    }

    &:not(.flat) {
        background: var(--color-primary);
    }

    .ripple {
        position: absolute;
        top: v-bind('ripple.y');
        left: v-bind('ripple.x');
        background: rgba(255, 255, 255, .25);
        width: 10px;
        height: 10px;
        border-radius: 999px;
        animation: ripple .3s cubic-bezier(0.455, 0.03, 0.515, 0.955);
        transform: translate(-50%, -50%);
        display: none;
    }

    .ripple.active {
        display: block;
    }
}

@keyframes ripple {
    0% {
        width: 0%;
        height: 0%;
        opacity: 1;
    }

    100% {
        opacity: 0;
        width: 100vh;
        height: 100vh;
    }
}
</style>