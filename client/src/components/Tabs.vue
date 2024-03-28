<template>
    <div class="flex flex-column">
        <div v-if="tabs" class="tab-headers">
            <nav class="tab-header-container flex align-items-center">
                <a class="tab-header" v-for="tab in tabs" :href="tab.props.anchor">{{ tab.props.title }}</a>
                <!-- <div class="tab-header-active-indicator"></div> -->
            </nav>
        </div>
        <div class="tabs scroll-snap-x">
            <Tab :anchor="tab.props.anchor" v-for="tab in tabs">
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
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    /* gap: 5rem; */
}

.tab-header-container {
    overflow-x: scroll;

    @media (hover: none) {
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
}

.tab-headers {
    user-select: none;
    position: relative;
    background: var(--primary);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    display: grid;


}

.tab-header {
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: var(--md) var(--md);
    font-size: 1.25rem;
}

.tab-header-active-indicator {
    position: absolute;
    top: calc(100% - 4px);
    background: white;
    width: calc(25%);
    height: 4px;
    left: 50%;
}

.tab {
    scroll-snap-align: start;
    overflow-y: auto;
    padding: var(--lg);
}

.scroll-snap-x {
    overflow: auto hidden;
    scroll-snap-type: x mandatory;

    scroll-behavior: smooth;

    @media (hover: none) {
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
}
</style>