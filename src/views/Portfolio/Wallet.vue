<template>
  <div class="flex flex-column">
    <template v-for="tokenLine in tokenLines">
      <WalletTokenLine :tokenLine="tokenLine"></WalletTokenLine>
    </template>
  </div>
</template>

<script setup>
import useDatabase from "@/composables/useDatabase";
import { getToken } from "@/utils/Token";
import WalletTokenLine from "./WalletTokenLine.vue";

const db = useDatabase().database;
const store = db.getStore("transactions");
const history = ref([]);

const tokenLines = computed(() => {
  return history.value.reduce((groups, line) => {
    let groupFound = groups.find(
      (group) => group.token.value === line.token.value
    );
    if (groupFound) {
      groupFound.amount += line.positive ? +line.toAmount : -line.toAmount;
      groupFound.value +=
        (line.positive ? +line.toAmount : -line.toAmount) * line.toValue;
      groupFound.cumulativeAmount += line.positive
        ? +line.toAmount
        : -line.toAmount;
      groupFound.cumulativeValue += line.positive
        ? +line.toValue
        : -line.toValue;
      (groupFound.buyCount += line.positive ? 1 : 0),
        (groupFound.sellCount += line.positive ? 0 : 1),
        (groupFound.transactionCount += 1);
      groupFound.cumulativeBuyValue += line.positive ? +line.toValue : 0;
      groupFound.cumulativeSellValue += line.positive ? 0 : +line.toValue;
      groupFound.cumulativeBuyAmount += line.positive
        ? +line.toAmount
        : -line.toAmount;
      groupFound.bought += (line.positive ? +line.toAmount : 0) * line.toValue;
      groupFound.selled += (line.positive ? 0 : -line.toAmount) * line.toValue;
    } else {
      let group = {
        amount: line.positive ? +line.toAmount : -line.toAmount,
        value: (line.positive ? +line.toAmount : -line.toAmount) * line.toValue,
        token: line.token,
        cumulativeAmount: line.positive ? +line.toAmount : -line.toAmount,
        cumulativeValue: line.positive ? +line.toValue : -line.toAmount,
        cumulativeBuyValue: line.positive ? +line.toValue : 0,
        cumulativeBuyAmount: line.positive ? +line.toAmount : 0,
        cumulativeSellValue: line.positive ? 0 : +line.toValue,
        buyCount: line.positive ? 1 : 0,
        sellCount: line.positive ? 0 : 1,
        transactionCount: 1,
        bought: (line.positive ? +line.toAmount : 0) * line.toValue,
        selled: (line.positive ? 0 : -line.toAmount) * line.toValue,
      };

      groups.push(group);
    }

    return groups;
  }, []);
});

onMounted(() => {
  history.value = store?.getAll().map((transaction) => ({
    ...transaction.value,
    token: getToken(transaction.value.token),
    id: transaction.id,
  }));

  store.onSave(() => {
    history.value = store?.getAll().map((transaction) => ({
      ...transaction.value,
      token: getToken(transaction.value.token),
      id: transaction.id,
    }));
  });
  store.onDelete(() => {
    history.value = store?.getAll().map((transaction) => ({
      ...transaction.value,
      token: getToken(transaction.value.token),
      id: transaction.id,
    }));
  });
});
</script>
