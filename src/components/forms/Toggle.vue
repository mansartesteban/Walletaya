<template>
    <div class="toggle flex w-100 h-100">
        <div v-for="item in items" class="item  flex align-items-center justify-content-center" :class="{ active: item.value === model?.value }"
            @click="selectItem(item)">{{ item.label }}</div>
    </div>

</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        default: []
    }
})
const model = defineModel()

function selectItem(item) {
    model.value = item
}

onMounted(() => model.value = props.items[0])
</script>

<style scoped lang="scss">
.toggle {
    .item {
        flex: 1;
        text-align: center;
        font-size: 1rem;
        padding: var(--sm) var(--md);
        transition: var(--transition);

        &:first-child {
            border-width: 1px 0 1px 1px;
            border-style: solid;
            border-color: var(--color-primary);
            border-radius: var(--border-radius) 0 0 var(--border-radius);

            &.active {
                background: var(--color-success);
                border-color: var(--color-success);
            }
        }

        &:last-child {
            border-width: 1px 1px 1px 0;
            border-style: solid;
            border-color: var(--color-primary);
            border-radius: 0 var(--border-radius) var(--border-radius) 0;

            &.active {
                border-color: var(--color-error);
                background: var(--color-error);
            }
        }
    }
}
</style>