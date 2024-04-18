const aggTransactionCount = () => {
  return 1;
};
const aggCreditCount = (transaction, token) => {
  if (transaction.creditToken.id === token.id) {
    return transaction.creditAmount ? 1 : 0;
  }
  return 0;
};

const aggDebitCount = (transaction, token) => {
  if (transaction.debitToken.id === token.id) {
    return transaction.debitAmount ? 1 : 0;
  }
  return 0;
};

const aggCredited = (transaction, token) => {
  if (transaction.creditToken.id === token.id) {
    return transaction.creditAmount * transaction.creditValue;
  }
  return 0;
};
const aggDebited = (transaction, token) => {
  if (transaction.debitToken.id === token.id) {
    return transaction.debitAmount * transaction.debitValue;
  }
  return 0;
};
const aggCumulativeAmount = (transaction, token) => {
  let result = 0;
  if (transaction.creditToken.id === token.id) {
    result += transaction.creditAmount;
  }
  if (transaction.debitToken.id === token.id) {
    result -= transaction.debitAmount;
  }
  return result;
};
const aggCumulativeAmountCredit = (transaction, token) => {
  if (transaction.creditToken.id === token.id) {
    return transaction.creditAmount;
  }
  return 0;
};
const aggCumulativeAmountDebit = (transaction, token) => {
  if (transaction.debitToken.id === token.id) {
    return transaction.debitAmount;
  }
  return 0;
};
const aggCumulativeValue = (transaction, token) => {
  let result = 0;
  if (transaction.creditToken.id === token.id) {
    result += transaction.creditValue;
  }
  if (transaction.debitToken.id === token.id) {
    result -= transaction.debitValue;
  }
  return result;
};
const aggCumulativeValueCredit = (transaction, token) => {
  if (transaction.creditToken.id === token.id) {
    return transaction.creditValue;
  }
  return 0;
};
const aggCumulativeValueDebit = (transaction, token) => {
  if (transaction.debitToken.id === token.id) {
    return transaction.debitValue;
  }
  return 0;
};
const aggCumulativeAssets = (transaction, token) => {
  let result = 0;
  if (transaction.creditToken.id === token.id) {
    result += transaction.creditAmount * transaction.creditValue;
  }
  if (transaction.debitToken.id === token.id) {
    result -= transaction.debitAmount * transaction.debitValue;
  }
  return result;
};
const aggCumulativeAssetsCredit = (transaction, token) => {
  if (transaction.creditToken.id === token.id) {
    return transaction.creditAmount * transaction.creditValue;
  }
  return 0;
};
const aggCumulativeAssetsDebit = (transaction, token) => {
  if (transaction.debitToken.id === token.id) {
    return transaction.debitAmount * transaction.debitValue;
  }
  return 0;
};

export default {
  aggregate(aggregation, token, transaction) {
    aggregation.credited += aggCredited(transaction, token);
    aggregation.debited += aggDebited(transaction, token);
    aggregation.creditCount += aggCreditCount(transaction, token);
    aggregation.debitCount += aggDebitCount(transaction, token);
    aggregation.transactionCount += aggTransactionCount(transaction, token);
    aggregation.cumulativeAmount += aggCumulativeAmount(transaction, token);
    aggregation.cumulativeAmountCredit += aggCumulativeAmountCredit(
      transaction,
      token
    );
    aggregation.cumulativeAmountDebit += aggCumulativeAmountDebit(
      transaction,
      token
    );
    aggregation.cumulativeValue += aggCumulativeValue(transaction, token);
    aggregation.cumulativeValueCredit += aggCumulativeValueCredit(
      transaction,
      token
    );
    aggregation.cumulativeValueDebit += aggCumulativeValueDebit(
      transaction,
      token
    );
    aggregation.cumulativeAssets += aggCumulativeAssets(transaction, token);
    aggregation.cumulativeAssetsCredit += aggCumulativeAssetsCredit(
      transaction,
      token
    );
    aggregation.cumulativeAssetsDebit += aggCumulativeAssetsDebit(
      transaction,
      token
    );
    return aggregation;
  },
};
