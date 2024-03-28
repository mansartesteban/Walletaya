<template>
    <div class="app-header">
        <AppBar></AppBar>
    </div>
</template>

<script setup>
import useTabs from "@/composables/useTabs"
import AppBar from "@/components/AppBar.vue"
// import { onMounted } from "vue"
// import useApp from "@/composables/useApp"

const tabs = useTabs().tabs

// useTabs().onChange(() => {
//     useApp().headerHeight.value = tabs.value.length ? "96px" : "64px"
//     setBodyHeight()
// })

// const setBodyHeight = () => {
//     document.body.style.paddingTop = useApp().headerHeight.value
// }

// onMounted(setBodyHeight)

</script>

<style scoped>
.app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--primary);
    box-shadow: var(--shadow);
}

.appbar {
    height: 64px;
    background: var(--primary);
    position: relative;
}

/*  */
</style>