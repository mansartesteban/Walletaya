const aggTransactionCount = () => {
  return 1;
};
const aggCreditCount = (transaction, token) => {
  if (transaction.creditToken.value === token.value) {
    return transaction.creditAmount ? 1 : 0;
  }
  return 0;
};

const aggDebitCount = (transaction, token) => {
  if (transaction.debitToken.value === token.value) {
    return transaction.debitAmount ? 1 : 0;
  }
  return 0;
};

const aggCredited = (transaction, token) => {
  if (transaction.creditToken.value === token.value) {
    return transaction.creditAmount * transaction.creditValue;
  }
  return 0;
};
const aggDebited = (transaction, token) => {
  if (transaction.debitToken.value === token.value) {
    return transaction.debitAmount * transaction.debitValue;
  }
  return 0;
};
const aggCumulativeAmount = (transaction, token) => {
  let result = 0;
  if (transaction.creditToken.value === token.value) {
    result += transaction.creditAmount;
  }
  if (transaction.debitToken.value === token.value) {
    result -= transaction.debitAmount;
  }
  return result;
};
const aggCumulativeAmountCredit = (transaction, token) => {
  if (transaction.creditToken.value === token.value) {
    return transaction.creditAmount;
  }
  return 0;
};
const aggCumulativeAmountDebit = (transaction, token) => {
  if (transaction.debitToken.value === token.value) {
    return transaction.debitAmount;
  }
  return 0;
};
const aggCumulativeValue = (transaction, token) => {
  let result = 0;
  if (transaction.creditToken.value === token.value) {
    result += transaction.creditValue;
  }
  if (transaction.debitToken.value === token.value) {
    result -= transaction.debitValue;
  }
  return result;
};
const aggCumulativeValueCredit = (transaction, token) => {
  if (transaction.creditToken.value === token.value) {
    return transaction.creditValue;
  }
  return 0;
};
const aggCumulativeValueDebit = (transaction, token) => {
  if (transaction.debitToken.value === token.value) {
    return transaction.debitValue;
  }
  return 0;
};
const aggCumulativeAssets = (transaction, token) => {
  let result = 0;
  if (transaction.creditToken.value === token.value) {
    result += transaction.creditAmount * transaction.creditValue;
  }
  if (transaction.debitToken.value === token.value) {
    result -= transaction.debitAmount * transaction.debitValue;
  }
  return result;
};
const aggCumulativeAssetsCredit = (transaction, token) => {
  if (transaction.creditToken.value === token.value) {
    return transaction.creditAmount * transaction.creditValue;
  }
  return 0;
};
const aggCumulativeAssetsDebit = (transaction, token) => {
  if (transaction.debitToken.value === token.value) {
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
