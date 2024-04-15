<template>
  <div class="transaction-form flex flex-column gap-md">
    <div
      class="form-line flex gap-md"
      :class="{ 'flex-reverse': settings.leftHanded }"
    >
      <InputNumber
        v-model="toAmount"
        label="Montant"
        :append="selectedTokenTo?.symbol"
      >
      </InputNumber>
      <TokenPicker
        v-model="selectedTokenTo"
        @changed="changedToken"
      ></TokenPicker>
    </div>

    <div class="form-line flex gap-md">
      <InputNumber v-model="toValue" label="Valeur" append="USDT"></InputNumber>
    </div>
    <div class="form-line">
      <Toggle v-model="positive" :items="buyOrSellItems"></Toggle>
    </div>
    <div
      class="amount-display flex align-items-center gap-xs"
      :class="positive ? 'positive' : 'negative'"
    >
      <div>{{ positive ? "+" : "-" }}</div>
      <div>{{ computedAmount }}</div>
      <div>USTD</div>
    </div>

    <div class="flex gap-md" :class="{ 'flex-reverse': settings.leftHanded }">
      <Btn
        v-if="transactionId"
        @click="deleteTransaction(transactionId)"
        severity="error"
      >
        <Icon>delete</Icon>
        {{ "Supprimer" }}
      </Btn>
      <Btn @click="saveTransaction(transactionId)">
        <Icon>save</Icon>
        {{ transactionId ? "Modifier" : "Ajouter" }}
      </Btn>
    </div>
  </div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import InputNumber from "@/components/forms/InputNumber.vue";
import TokenPicker from "@/components/TokenPicker.vue";
import Toggle from "@/components/forms/Toggle.vue";
import Icon from "@/components/Icon.vue";
import { v4 as uuid } from "uuid";
import database from "@/plugins/database";
import useTokenStore from "@/plugins/stores/TokenList";
import useSettingsStore from "@/plugins/stores/Settings";

const emit = defineEmits(["saving", "saved", "deleting", "deleted"]);

const settings = useSettingsStore();

const toAmount = ref();
const toValue = ref(1);
const selectedTokenTo = ref(null);
const transactionId = ref(null);
const tokenStore = useTokenStore();

const buyOrSellItems = [
  { label: "Achat", value: true },
  { label: "Vente", value: false },
];
const positive = ref(true);

const store = database.getStore("transactions");

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

const changedToken = (v) => {
  toValue.value = tokenStore.prices[v.id];
};

const reset = (resetToken = true) => {
  toAmount.value = "";
  positive.value = true;
  transactionId.value = null;
  if (resetToken) {
    selectedTokenTo.value = settings.defaultTokenFrom;
  }
};

const fillForm = (data) => {
  toAmount.value = data.toAmount;
  positive.value = data.positive;
  selectedTokenTo.value = data.token.value;
  toValue.value = data.toValue;
  transactionId.value = data.id;
};

const saveTransaction = (id) => {
  if (!id) {
    id = uuid();
  }
  emit("saving");
  store
    .save(id, {
      toAmount: toAmount.value,
      toValue: toValue.value,
      token: selectedTokenTo.value,
      positive: positive.value,
    })
    .then(() => {
      emit("saved");
      reset(false);
    });
};

const deleteTransaction = (id) => {
  if (id) {
    emit("deleting");
    store.delete(id).then(() => {
      emit("deleted");
      reset();
    });
  }
};

defineExpose({
  fillForm,
  reset,
});
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
