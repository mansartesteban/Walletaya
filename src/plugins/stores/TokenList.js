import { defineStore } from "pinia"
import { coinmarketcapApi } from "@/plugins/axios"
import cryptocurrencyList from "@/endpoints/cryptocurrency-list"
import cryptocurrencyQuotesLatest from "@/endpoints/cryptocurrency-quotes-latest.json"

export default defineStore("token", {
  state: () => {
    return {
      tokens: cryptocurrencyList,
      marketValues: {},
    }
  },
  getters: {
    tokenList(state) {
      return state.tokens.map((token) => {
        return {
          id: token.id,
          value: token.slug,
          symbol: token.symbol,
          label: token.name,
        }
      })
    },
    prices(state) {
      let prices = {}
      console.log("state.marketValues", state.marketValues)
      Object.values(state.marketValues).forEach((tokenValue) => {
        prices[tokenValue.id] = tokenValue.quote.USD.price
      })
      return prices
    },
  },
  actions: {
    getTokenPrice(token) {
      return this.prices[token.id] || 0
    },
    refreshTokens(fetchApi = false, tokens = []) {
      if (fetchApi && tokens.length > 0) {
        coinmarketcapApi
          .get("/v2/cryptocurrency/quotes/latest", {
            headers: {
              "X-CMC_PRO_API_KEY": "524d4c13-97d5-41ea-bc66-5c861259bd92",
            },
            params: {
              slug: tokens.join(","),
            },
          })
          .then((response) => {
            this.marketValues = {
              ...this.marketValues,
              ...response.data.data,
            }
          })
      } else {
        this.marketValues = cryptocurrencyQuotesLatest.data
      }
    },
  },
})
