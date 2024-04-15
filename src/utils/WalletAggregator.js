import { amount } from "@/utils/Token";
import useTokenListStore from "@/plugins/stores/TokenList";

const tokenListStore = useTokenListStore();

const aggTransactionCount = () => {
  return 1;
}
const aggBuyCount = (transaction) => {
  return transaction.positive ? 1 : 0
}
const aggSellCount = (transaction) => {
  return transaction.positive ? 0 : 1;
}
const aggBought = (transaction) => {
  return (transaction.positive ? +transaction.toAmount : 0) * transaction.toValue;
}
const aggSelled = (transaction) => {
  return (transaction.positive ? 0 : transaction.toAmount) * transaction.toValue;
}
const aggCumulativeAmount = (transaction) => {
  return transaction.positive ? +transaction.toAmount : -transaction.toAmount;
}
const aggCumulativeAmountBuy = (transaction) => {
  return transaction.positive ? +transaction.toAmount : 0;
}
const aggCumulativeAmountSell = (transaction) => {
  return transaction.positive ? 0 : transaction.toAmount;
}
const aggCumulativeValue = (transaction) => {
  return transaction.positive ? +transaction.toValue : -transaction.toValue;
}
const aggCumulativeValueBuy = (transaction) => {
  return transaction.positive ? +transaction.toValue : 0;
}
const aggCumulativeValueSell = (transaction) => {
  return transaction.positive ? 0 : +transaction.toValue;
}
const aggCumulativeAssets = (transaction) => {
  return transaction.toAmount * transaction.toValue * (transaction.positive ? 1 : -1);
}
const aggCumulativeAssetsBuy = (transaction) => {
  return transaction.toAmount * transaction.toValue * (transaction.positive ? 1 : 0);
}
const aggCumulativeAssetsSell = (transaction) => {
  return transaction.toAmount * transaction.toValue * (transaction.positive ? 0 : 1);
}

export default {
  aggregate(aggregation, transaction) {
    aggregation.bought += aggBought(transaction);
    aggregation.selled += aggSelled(transaction);
    aggregation.buyCount += aggBuyCount(transaction);
    aggregation.sellCount += aggSellCount(transaction);
    aggregation.transactionCount += aggTransactionCount(transaction);
    aggregation.cumulativeAmount += aggCumulativeAmount(transaction);
    aggregation.cumulativeAmountBuy += aggCumulativeAmountBuy(transaction);
    aggregation.cumulativeAmountSell += aggCumulativeAmountSell(transaction);
    aggregation.cumulativeValue += aggCumulativeValue(transaction);
    aggregation.cumulativeValueBuy += aggCumulativeValueBuy(transaction);
    aggregation.cumulativeValueSell += aggCumulativeValueSell(transaction);
    aggregation.cumulativeAssets += aggCumulativeAssets(transaction);
    aggregation.cumulativeAssetsBuy += aggCumulativeAssetsBuy(transaction);
    aggregation.cumulativeAssetsSell += aggCumulativeAssetsSell(transaction);
    return aggregation
  },

  assets(agg) {
    return amount(agg.cumulativeAmount * tokenListStore.getTokenPrice(agg.token))
  },

  amount(agg) {
    return amount(agg.cumulativeAmount, true)
  },

  smoothedPrice(agg) {
    return amount(agg.cumulativeAssets / agg.cumulativeAmount);
  },

  averageBuyPrice(agg) {
    return amount(agg.cumulativeAssetsBuy / agg.cumulativeAmountBuy);
  },

  bought(agg) {
    return amount(agg.bought)
  },

  selled(agg) {
    return amount(agg.selled)
  },

  priceVariation(agg) {
    return ((
      (agg.cumulativeAmount * tokenListStore.getTokenPrice(agg.token) - agg.cumulativeAssets) / agg.cumulativeAssets) * 100).toFixed(2);
  },

  profit(agg) {
    return amount(agg.cumulativeAmount * tokenListStore.getTokenPrice(agg.token) - agg.bought);
  }
}