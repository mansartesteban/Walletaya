<template>
  <!-- Wallet -->
  <Menu :items="items"></Menu>
  <div class="flex flex-column">
    <template v-for="transaction in history">
      <div
        class="transaction-line flex align-items-center justify-content-space-between gap-md p-md"
        v-touch
        @longTouch="onLongTouch(transaction)"
      >
        <div class="flex align-items-center gap-md">
          <CIcon :token="transaction.token.value"></CIcon>
          <div class="flex flex-column gap-xs">
            <div>{{ transaction.token.label }}</div>
            <div class="sublabel">{{ amount(transaction.toValue) }}</div>
          </div>
        </div>
        <div class="flex flex-column align-items-end gap-xs">
          <div :class="transaction.positive ? 'positive' : 'negative'">
            {{ transaction.positive ? "+" : "-" }}
            {{ amount(transaction.toAmount, true) }}
          </div>
          <div class="sublabel">
            {{ amount(transaction.toValue * transaction.toAmount) }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useDatabase from "@/composables/useDatabase";
import { getToken } from "@/utils/Token";
import CIcon from "@/components/CIcon.vue";

import Menu from "@/components/Menu.vue";

const items = ref([
  {
    label: "Supprimer",
    icon: "delete",
    sublabel: "Supprimer la transaction",
  },
  {
    label: "Modifier",
    icon: "edit",
    sublabel: "Modifier la transaction",
  },
  {
    label: "Copier",
    icon: "copy",
    sublabel: "Copier la transaction",
  },
]);

const db = useDatabase().database;
const store = db.getStore("transactions");
const history = ref([]);

const amount = (value, noSymbol = false) => {
  return value
    ?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    .replace("$", noSymbol ? "" : "$");
};

const onLongTouch = (transaction) => {
  store.delete(transaction.id);
};

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

<style scoped lang="scss">
.transaction-line {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.positive {
  color: var(--color-success);
}

.negative {
  color: var(--color-error);
}

.sublabel {
  color: rgba(255, 255, 255, 0.5);
}
</style>
