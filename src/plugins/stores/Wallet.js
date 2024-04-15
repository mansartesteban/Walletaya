import { defineStore } from "pinia";
import WalletAggregator from "@/utils/WalletAggregator";

export default defineStore("wallet", {
  state: () => {
    return {
      history: [],
    }
  },
  getters: {
    aggregatedTransactions(state) {
      let aggregations = state.history.reduce((aggregations, transaction) => {
        if (!aggregations[transaction.token.id]) {
          aggregations[transaction.token.id] = {
            token: transaction.token,
            amount: 0,
            value: 0,
            bought: 0,
            selled: 0,
            buyCount: 0,
            sellCount: 0,
            cumulativeAmount: 0,
            cumulativeAmountBuy: 0,
            cumulativeAmountSell: 0,
            transactionCount: 0,
            cumulativeValue: 0,
            cumulativeValueBuy: 0,
            cumulativeValueSell: 0,
            cumulativeAssets: 0,
            cumulativeAssetsBuy: 0,
            cumulativeAssetsSell: 0,
          }
        }
        return aggregations
      }, {})

      state.history.forEach(transaction => {
        aggregations[transaction.token.id] = WalletAggregator.aggregate(aggregations[transaction.token.id], transaction)
      })

      return aggregations;
    }
  },
  actions: {
    setHistory(history) {
      this.history = history;
    },
  }
});