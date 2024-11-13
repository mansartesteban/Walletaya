<template>
  <Btn
    v-if="!drawerOpened"
    @click="showTransactionForm"
    fab
    icon="forms_add_on"
  ></Btn>
  <div class="flex items-center gap-4 px-4 py-2">
    <span>Filtrer :</span>
    <TokenPicker
      v-model="tokenFilter"
      clearable
    ></TokenPicker>
  </div>
  <div class="flex flex-col">
    <template v-for="transaction in history">
      <div
        v-if="transaction.transactionType === 0"
        class="transaction-line flex items-center justify-between gap-4 p-4 border-t border-white/10"
        @click="fillForm(transaction)"
      >
        <div class="flex items-center gap-4">
          <CIcon :token="transaction.creditToken"></CIcon>
          <div class="flex flex-col gap-1">
            <div>{{ transaction.creditToken.symbol }}</div>
            <div class="sublabel nowrap">
              {{ amount(transaction.creditValue, false, 4) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1">
          <div class="text-green-600 nowrap">
            + {{ amount(transaction.creditAmount, true) }}
          </div>
          <div class="sublabel nowrap">
            {{ amount(transaction.creditValue * transaction.creditAmount) }}
          </div>
        </div>
      </div>
      <div
        v-if="transaction.transactionType === 2"
        class="transaction-line flex items-center justify-between gap-4 p-4 border-t border-white/10"
        @click="fillForm(transaction)"
      >
        <div class="flex items-center gap-4">
          <CIcon :token="transaction.debitToken"></CIcon>
          <div class="flex flex-col gap-2">
            <div>{{ transaction.debitToken.symbol }}</div>
            <div class="sublabel nowrap">
              {{ amount(transaction.debitValue, false, 4) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1">
          <div class="text-red-600 nowrap">
            - {{ amount(transaction.debitAmount, true) }}
          </div>
          <div class="sublabel nowrap">
            {{ amount(transaction.debitValue * transaction.debitAmount) }}
          </div>
        </div>
      </div>
      <div
        v-if="transaction.transactionType === 1"
        class="transaction-line flex flex-col border-t border-white/10"
        @click="fillForm(transaction)"
      >
        <div class="flex items-center justify-between gap-4 p-4">
          <div class="flex items-center gap-4">
            <CIcon :token="transaction.creditToken"></CIcon>
            <div class="flex flex-col gap-1">
              <div>{{ transaction.creditToken.label }}</div>
              <div class="sublabel">
                {{ amount(transaction.creditValue, false, 4) }}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end gap-1">
            <div class="text-green-600 nowrap">
              + {{ amount(transaction.creditAmount, true) }}
            </div>
            <div class="sublabel nowrap">
              {{ amount(transaction.creditValue * transaction.creditAmount) }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between gap-4 p-4">
          <div class="flex items-center gap-4">
            <CIcon :token="transaction.debitToken"></CIcon>
            <div class="flex flex-col gap-1">
              <div>{{ transaction.debitToken.label }}</div>
              <div class="sublabel">
                {{ amount(transaction.debitValue, false, 4) }}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end gap-1">
            <div class="text-red-600 nowrap">
              - {{ amount(transaction.debitAmount, true) }}
            </div>
            <div class="sublabel nowrap">
              {{ amount(transaction.debitValue * transaction.debitAmount) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <Drawer v-model:opened="drawerOpened">
    <TransactionForm
      ref="transactionForm"
      @deleted="drawerOpened = false"
      @saved="drawerOpened = false"
    >
    </TransactionForm>
  </Drawer>
</template>

<script setup>
import { amount } from "@/utils/Token";
import useWalletStore from "@/plugins/stores/Wallet";

const walletStore = useWalletStore();
const drawerOpened = ref(false);
const transactionForm = ref();

const fillForm = (transaction) => {
  transactionForm.value.fillForm(transaction);
  drawerOpened.value = true;
};

const showTransactionForm = () => {
  transactionForm.value.reset();
  drawerOpened.value = true;
};

const tokenFilter = ref(null);

const history = computed(() => {
  return walletStore.history
    .sort((a, b) => b.date - a.date)
    .filter((transaction) => {
      return (
        tokenFilter.value === null ||
        [
          transaction.creditToken?.value,
          transaction.debitToken?.value,
        ].includes(tokenFilter.value)
      );
    });
});
</script>
