<template>
    <div class="app-header">
        <AppBar></AppBar>
        <div v-if="tabs" class="tab-headers">
            <nav class="tab-header-container flex align-items-center">
                <a class="tab-header" v-for="tab in tabs" :href="tab.props.anchor">{{ tab.props.title }}</a>
                <!-- <div class="tab-header-active-indicator"></div> -->
            </nav>
        </div>
    </div>
</template>

<script setup>
import useTabs from "@/composables/useTabs"
import AppBar from "@/components/AppBar.vue"

const tabs = useTabs().tabs

console.log("in header", tabs)

// const props = defineProps({
//     tabs: {
//         type: Array,
//         default: () => []
//     }
// })

// const tabs = reactive([
//     {
//         href: "#tab1",
//         title: "Onglet 1"
//     },
//     {
//         href: "#tab2",
//         title: "Onglet 2"
//     },
//     {
//         href: "#tab3",
//         title: "Onglet 3"
//     },
//     {
//         href: "#tab4",
//         title: "Onglet 4"
//     },
//     {
//         href: "#tab5",
//         title: "Onglet 5"
//     },
//     {
//         href: "#tab6",
//         title: "Onglet 6"
//     },
// ])

defineExpose({
    height: tabs.value ? "var(--md) + 64px" : "64px"
})
</script>

<style scoped>
.app-header {
    background: var(--primary);
    box-shadow: var(--shadow);
}


.tab-header-container {
    overflow-x: scroll;
    display: flex;
}

.tab-headers {
    user-select: none;
    position: relative;
}

.tab-header {
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* overflow-x: hidden; */
    width: 25% !important;
    min-width: 25% !important;
    padding: var(--sm) 0 var(--md);
    font-size: var(--md);
}

.tab-header-active-indicator {
    position: absolute;
    top: calc(100% - 4px);
    background: white;
    width: calc(25%);
    height: 4px;
    left: 50%;
}

.appbar {
    height: 64px;
    background: var(--primary);
    position: relative;
}

.appbar::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: var(--md);
    background: linear-gradient(180deg, var(--primary) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>