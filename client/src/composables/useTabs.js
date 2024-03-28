const tabs = ref([])
const callbacks = []
watch(tabs, () => callbacks.forEach(callback => callback()))

export default (tabsToHoist) => {

    if (tabsToHoist) {
        tabs.value = tabsToHoist
    }

    const onChange = (callback) => {
        callbacks.push(callback)
    }

    return {
        onChange,
        tabs
    }
}