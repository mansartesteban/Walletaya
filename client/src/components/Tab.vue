<template>
    <article class="tab" :id="computedAnchor">
        <slot></slot>
    </article>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "[Onglet]"
    },
    anchor: {
        type: String,
        required: true
    }
})

const computedAnchor = computed(() => {
    return props.anchor.replace("#", "")
})
</script>

<script>
export default {
    name: "Tab"
}
</script>
