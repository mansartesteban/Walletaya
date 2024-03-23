import { ref } from "vue"

export default () => {

    const settings = ref({
        defaultTokenFrom: "USDT",
        defaultTokenTo: "BTC",
        defaultCurrency: "€"
    })

    return settings.value
}