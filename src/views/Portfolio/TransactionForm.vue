<template>
  <div class="transaction-form flex flex-column gap-md">
    <div class="form-line flex gap-md">
      <InputNumber
        v-model="toAmount"
        label="Montant"
        class="min-width-0 flex-1"
        :append="selectedTokenTo?.value"
      >
      </InputNumber>
      <TokenPicker v-model="selectedTokenTo"></TokenPicker>
    </div>
    <div class="form-line flex gap-md align-items-center text-sm">
      <InputNumber
        v-model="toValue"
        label="Valeur"
        class="min-width-0 flex-1"
        append="USDT"
      ></InputNumber>
    </div>
    <div class="form-line">
      <Toggle v-model="positive" :items="buyOrSellItems"></Toggle>
    </div>
    <div
      class="amount-display flex align-items-center gap-xs"
      :class="positive.value === 'positive' ? 'positive' : 'negative'"
    >
      <div>{{ positive.value === "positive" ? "+" : "-" }}</div>
      <div>{{ computedAmount }}</div>
      <div>USTD</div>
    </div>
    <Btn @click="save" class="p-md">Ajouter</Btn>
  </div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import InputNumber from "@/components/forms/InputNumber.vue";
import TokenPicker from "@/components/TokenPicker.vue";
import Toggle from "@/components/forms/Toggle.vue";
import useDatabase from "@/composables/useDatabase";
import { v4 as uuid } from "uuid";

const toAmount = ref();
const toValue = ref(1);
const selectedTokenTo = ref(null);

const buyOrSellItems = ref([
  { label: "Acheter", value: "positive" },
  { label: "Vente", value: "negative" },
]);
const positive = ref(buyOrSellItems.value[0]);

const db = useDatabase().database;
const store = db.getStore("transactions");

const computedAmount = computed(() => {
  let amount = 0;
  if (toAmount.value && toValue.value) {
    amount = toAmount.value * toValue.value;
  }

  return amount
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    .replace("$", "");
});

const save = () => {
  store.save(uuid(), {
    toAmount: toAmount.value,
    toValue: toValue.value,
    token: selectedTokenTo.value.value,
    positive: positive.value.value === "positive",
  });
};
</script>

<style scoped lang="scss">
.amount-display {
  text-align: center;

  :first-child {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.positive {
    color: var(--color-success);
  }

  &.negative {
    color: var(--color-error);
  }
}
</style>
