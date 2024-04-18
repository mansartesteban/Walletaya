import { defineStore } from "pinia";
import WalletAggregator from "@/utils/WalletAggregator";

export default defineStore("wallet", {
  state: () => {
    return {
      history: [],
    };
  },
  getters: {
    aggregatedTransactions(state) {
      let aggregations = state.history.reduce((aggregations, transaction) => {
        if (
          transaction.creditToken &&
          !aggregations[transaction.creditToken.value]
        ) {
          aggregations[transaction.creditToken.value] = {
            token: transaction.creditToken,
            amount: 0,
            value: 0,
            credited: 0,
            debited: 0,
            creditCount: 0,
            debitCount: 0,
            cumulativeAmount: 0,
            cumulativeAmountCredit: 0,
            cumulativeAmountDebit: 0,
            transactionCount: 0,
            cumulativeValue: 0,
            cumulativeValueCredit: 0,
            cumulativeValueDebit: 0,
            cumulativeAssets: 0,
            cumulativeAssetsCredit: 0,
            cumulativeAssetsDebit: 0,
          };
        }
        if (
          transaction.debitToken &&
          !aggregations[transaction.debitToken.value]
        ) {
          aggregations[transaction.debitToken.value] = {
            token: transaction.debitToken,
            amount: 0,
            value: 0,
            credited: 0,
            debited: 0,
            creditCount: 0,
            debitCount: 0,
            cumulativeAmount: 0,
            cumulativeAmountCredit: 0,
            cumulativeAmountDebit: 0,
            transactionCount: 0,
            cumulativeValue: 0,
            cumulativeValueCredit: 0,
            cumulativeValueDebit: 0,
            cumulativeAssets: 0,
            cumulativeAssetsCredit: 0,
            cumulativeAssetsDebit: 0,
          };
        }
        return aggregations;
      }, {});

      state.history.forEach((transaction) => {
        if (transaction.creditToken) {
          aggregations[transaction.creditToken.value] =
            WalletAggregator.aggregate(
              aggregations[transaction.creditToken.value],
              transaction.creditToken,
              transaction
            );
        }
        if (transaction.debitToken) {
          aggregations[transaction.debitToken.value] =
            WalletAggregator.aggregate(
              aggregations[transaction.debitToken.value],
              transaction.debitToken,
              transaction
            );
        }
      });

      return aggregations;
    },
    usedTokens(state) {
      let usedTokens = [];
      state.history.forEach((transaction) => {
        if (!usedTokens.includes(transaction.creditToken.value)) {
          usedTokens.push(transaction.creditToken.value);
        }
        if (!usedTokens.includes(transaction.debitToken.value)) {
          usedTokens.push(transaction.debitToken.value);
        }
      });
      return usedTokens;
    },
  },
  actions: {
    setHistory(history) {
      this.history = history;
    },
  },
});
