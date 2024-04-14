import cryptocurrencyList from "@/endpoints/cryptocurrency-list";
import cryptocurrencyQuotesLatest from "@/endpoints/cryptocurrency-quotes-latest";
import { coinmarketcapApi } from "@/plugins/axios";

import { defineStore } from "pinia";

const fetchApi = true;

export default defineStore("token", {
  state: () => {
    return {
      tokens: cryptocurrencyList,
      favoriteTokens: [
        "tether",
        "ternoa",
        "bitcoin",
        "sleepless-ai",
        "multiversx-egld",
        "automata-network",
        "lto-network",
        "truefi-token",
        "ethereum",
        "orion-xyz",
        "ava",
        "civic",
      ],
      marketValues: {},
    };
  },
  getters: {
    tokenList(state) {
      return state.tokens
        .filter((token) => this.favoriteTokens.includes(token.slug))
        .map((token) => {
          return {
            id: token.id,
            value: token.slug,
            symbol: token.symbol,
            label: token.name,
          };
        });
    },
    prices(state) {
      let prices = {};
      Object.values(state.marketValues).forEach((tokenValue) => {
        prices[tokenValue.id] = tokenValue.quote.USD.price;
      });
      return prices;
    },
  },
  actions: {
    getTokenPrice(token) {
      return this.prices[token.id] || 0;
    },
    refresh() {
      if (fetchApi) {
        coinmarketcapApi
          .get("/v2/cryptocurrency/quotes/latest", {
            headers: {
              "X-CMC_PRO_API_KEY": "524d4c13-97d5-41ea-bc66-5c861259bd92",
            },
            params: {
              slug: this.favoriteTokens.join(","),
            },
          })
          .then((response) => {
            this.marketValues = { ...this.marketValues, ...response.data.data };
          });
      } else {
        this.marketValues = cryptocurrencyQuotesLatest;
      }
    },
  },
});
