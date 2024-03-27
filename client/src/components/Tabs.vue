<template>
    <div class="tabs">
        <div class="tab-content" v-for="tab in tabs">
            <Tab :anchor="tab.props.anchor">
                <component :is="tab.is" v-bind="tab.attrs"></component>
            </Tab>
        </div>

    </div>
</template>

<script setup>
import { useSlots } from "vue"
import Tab from "@/components/Tab.vue"

import useTabs from "@/composables/useTabs"

const slots = useSlots()

const tabs = computed(() => {
    let realTabs = slots.default().filter(node => node.type.name === "Tab")

    return realTabs.map(tab => ({
        is: tab.children.default,
        attrs: tab.attrs,
        props: tab.props
    }))
})

useTabs(tabs.value)


</script>

<style scoped>
.tabs {
    /* outline: 1px dashed red; */
}

.tab-header {
    /* outline: 1px dashed fuchsia; */
}

.tabs-content {
    /* outline: 1px dashed greenyellow; */
}

.tab {
    height: 100%;
    flex: 1;
    outline: 1px dashed cornflowerblue;
}
</style>