const tabs = ref([])

export default (tabsToHoist) => {

    if (tabsToHoist) {
        tabs.value = tabsToHoist
    }
    return {
        tabs
    }
}