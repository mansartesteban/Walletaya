<template>
  <Btn v-if="!drawerOpened" @click="showTransactionForm" fab>
    <Icon size="24">transaction-add</Icon>
  </Btn>
  <div class="flex flex-column">
    <template v-for="transaction in walletStore.history">
      <div
        v-if="transaction.transactionType === 0"
        class="transaction-line flex align-items-center justify-content-space-between gap-md p-md"
        @click="fillForm(transaction)"
      >
        <div class="flex align-items-center gap-md">
          <CIcon :token="transaction.creditToken"></CIcon>
          <div class="flex flex-column gap-xs">
            <div>{{ transaction.creditToken.label }}</div>
            <div class="sublabel">
              {{ amount(transaction.creditValue, false, 4) }}
            </div>
          </div>
        </div>
        <div class="flex flex-column align-items-end gap-xs">
          <div class="positive">
            + {{ amount(transaction.creditAmount, true) }}
          </div>
          <div class="sublabel">
            {{ amount(transaction.creditValue * transaction.creditAmount) }}
          </div>
        </div>
      </div>
      <div
        v-if="transaction.transactionType === 2"
        class="transaction-line flex align-items-center justify-content-space-between gap-md p-md"
        @click="fillForm(transaction)"
      >
        <div class="flex align-items-center gap-md">
          <CIcon :token="transaction.debitToken"></CIcon>
          <div class="flex flex-column gap-xs">
            <div>{{ transaction.debitToken.label }}</div>
            <div class="sublabel">
              {{ amount(transaction.debitValue, false, 4) }}
            </div>
          </div>
        </div>
        <div class="flex flex-column align-items-end gap-xs">
          <div class="negative">
            - {{ amount(transaction.debitAmount, true) }}
          </div>
          <div class="sublabel">
            {{ amount(transaction.debitValue * transaction.debitAmount) }}
          </div>
        </div>
      </div>

      <div
        v-if="transaction.transactionType === 1"
        class="transaction-line flex flex-column"
        @click="fillForm(transaction)"
      >
        <div
          class="flex align-items-center justify-content-space-between gap-md p-md"
        >
          <div class="flex align-items-center gap-md">
            <CIcon :token="transaction.creditToken"></CIcon>
            <div class="flex flex-column gap-xs">
              <div>{{ transaction.creditToken.label }}</div>
              <div class="sublabel">
                {{ amount(transaction.creditValue, false, 4) }}
              </div>
            </div>
          </div>
          <div class="flex flex-column align-items-end gap-xs">
            <div class="positive">
              + {{ amount(transaction.creditAmount, true) }}
            </div>
            <div class="sublabel">
              {{ amount(transaction.creditValue * transaction.creditAmount) }}
            </div>
          </div>
        </div>
        <div
          class="flex align-items-center justify-content-space-between gap-md p-md"
        >
          <div class="flex align-items-center gap-md">
            <CIcon :token="transaction.debitToken"></CIcon>
            <div class="flex flex-column gap-xs">
              <div>{{ transaction.debitToken.label }}</div>
              <div class="sublabel">
                {{ amount(transaction.debitValue, false, 4) }}
              </div>
            </div>
          </div>
          <div class="flex flex-column align-items-end gap-xs">
            <div class="negative">
              - {{ amount(transaction.debitAmount, true) }}
            </div>
            <div class="sublabel">
              {{ amount(transaction.debitValue * transaction.debitAmount) }}
            </div>
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
import CIcon from "@/components/CIcon.vue";
import { amount } from "@/utils/Token";
import useWalletStore from "@/plugins/stores/Wallet";

const walletStore = useWalletStore();
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
</script>

<style scoped lang="scss"></style>
