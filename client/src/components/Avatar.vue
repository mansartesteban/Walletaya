<template>
    <div class="avatar flex align-items-center justify-content-center" :style="style">
        <template v-if="letters">
            {{ letters }}
        </template>
        <template v-else></template>
    </div>
</template>

<script setup>
import { pickRandom } from "@/utils/Array"
import { colors } from "@/theme/colors"

const props = defineProps({
    size: {
        type: Number,
        default: 48
    },
    img: {
        type: String,
        default: ""
    },
    letters: {
        type: String,
        default: undefined,
        validator: (value) => value.length == 2
    }
})

const pickedColor = ref(pickRandom(colors))

const style = computed(() => {
    return {
        background: pickedColor.value
    }
})
</script>

<style scoped>
.avatar {
    width: calc(v-bind('size') * 1px);
    height: calc(v-bind('size') * 1px);
    border-radius: 999px;
    color: white;
    border: none;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;   background: rgba(0, 0, 0, 0.3);
}
</style>