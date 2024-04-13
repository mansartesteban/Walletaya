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
      groupFound.cumulativeAmount += +line.toAmount;
    } else {
      let group = {
        amount: line.positive ? +line.toAmount : -line.toAmount,
        value: (line.positive ? +line.toAmount : -line.toAmount) * line.toValue,
        token: line.token,
        cumulativeAmount: +line.toAmount,
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

<style scoped lang="scss"></style>
