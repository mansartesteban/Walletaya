<template>
  <Btn v-if="!drawerOpened" @click="showTransactionForm" fab>
    <Icon size="24">transaction-add</Icon>
  </Btn>
  <div class="flex flex-column">
    <template v-for="transaction in history">
      <div
        class="transaction-line flex align-items-center justify-content-space-between gap-md p-md"
        @click="fillForm(transaction)"
      >
        <!-- v-touch -->
        <!-- @touch="onTouch($event, transaction)" -->
        <div class="flex align-items-center gap-md">
          <CIcon :token="transaction.token.id"></CIcon>
          <div class="flex flex-column gap-xs">
            <div>{{ transaction.token.label }}</div>
            <div class="sublabel">
              {{ amount(transaction.toValue, false, 4) }}
            </div>
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

  <Drawer v-model:opened="drawerOpened">
    <TransitionForm
      ref="transactionForm"
      @deleted="drawerOpened = false"
      @saved="drawerOpened = false"
    ></TransitionForm>
  </Drawer>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import Icon from "@/components/Icon.vue";
import TransitionForm from "./TransactionForm.vue";
import Drawer from "@/components/Drawer.vue";
import useDatabase from "@/composables/useDatabase";
import { getToken } from "@/utils/Token";
import CIcon from "@/components/CIcon.vue";
// import useContextMenu from "@/composables/useContextMenu";
import { amount } from "@/utils/Token";

const db = useDatabase().database;
const store = db.getStore("transactions");
const history = ref([]);
const drawerOpened = ref(false);
const transactionForm = ref();

function fillForm(transaction) {
  transactionForm.value.fillForm(transaction);
  drawerOpened.value = true;
}

function showTransactionForm() {
  transactionForm.value.reset();
  drawerOpened.value = true;
}

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
