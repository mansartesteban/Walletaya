<template>
  <div class="transaction-form flex flex-col gap-3">
    <div class="h-12">
      <ButtonGroup
        v-model="transactionType"
        :items="transactionTypes"
      ></ButtonGroup>
    </div>

    <DatePicker
      v-model="transactionDate"
      timePicker
    ></DatePicker>

    <!-- Credit form -->
    <Card
      noHeader
      v-if="[1, 2].includes(transactionType)"
    >
      <div class="flex flex-col gap-4">
        Débit
        <div
          class="flex gap-4 h-12"
          :class="{ 'flex-row-reverse': settings.leftHanded }"
        >
          <InputNumber
            v-model="debitAmount"
            label="Montant"
            :append="debitToken?.symbol"
          >
          </InputNumber>
          <Btn
            v-if="transactionType === 1"
            icon="equal"
            @click="debitAutoCalculate"
          ></Btn>
          <TokenPicker
            v-model="debitToken"
            @changed="debitChangedToken"
          ></TokenPicker>
        </div>
        <div class="h-12 flex gap-4">
          <InputNumber
            v-model="debitValue"
            label="Valeur"
            append="USDT"
          ></InputNumber>
        </div>
        <div class="text-center flex items-center gap-1 text-red-600">
          <div class="overflow-clip text-ellipsis whitespace-nowrap">
            - {{ debitComputedAmount }}
          </div>
          <div>USTD</div>
        </div>
      </div>
    </Card>

    <Btn
      v-if="transactionType === 1"
      icon="swap_vert"
      class="-my-8 mx-auto"
      size="lg"
      rounded
      style="z-index: 1"
      @click="swap"
    ></Btn>

    <!-- Debut From -->
    <Card
      noHeader
      v-if="[0, 1].includes(transactionType)"
    >
      <div class="flex flex-col gap-4">
        Crédit
        <div
          class="h-12 flex gap-4"
          :class="{ 'flex-row-reverse': settings.leftHanded }"
        >
          <InputNumber
            v-model="creditAmount"
            label="Montant"
            :append="creditToken?.symbol"
          >
          </InputNumber>
          <Btn
            v-if="transactionType === 1"
            icon="equal"
            @click="creditAutoCalculate"
          ></Btn>
          <TokenPicker
            v-model="creditToken"
            @changed="creditChangedToken"
          ></TokenPicker>
        </div>
        <div class="h-12 flex gap-4">
          <InputNumber
            v-model="creditValue"
            label="Valeur"
            append="USDT"
          ></InputNumber>
        </div>
        <div class="text-center flex items-center gap-1 text-green-600">
          <div class="overflow-clip text-ellipsis whitespace-nowrap">
            + {{ creditComputedAmount }}
          </div>
          <div>USTD</div>
        </div>
      </div>
    </Card>

    <div
      class="flex gap-4"
      :class="{ 'flex-row-reverse': settings.leftHanded }"
    >
      <Btn
        v-if="transactionId"
        @click="deleteTransaction(transactionId)"
        icon="delete"
        icon-reverse
        severity="error"
        elevated
      >
        Supprimer
      </Btn>
      <Btn
        @click="saveTransaction(transactionId)"
        icon="save"
        icon-reverse
        elevated
        severity="success"
        full-width
      >
        {{ transactionId ? "Modifier" : "Ajouter" }}
      </Btn>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuid } from "uuid";
import database from "@/plugins/database";
import useTokenListStore from "@/plugins/stores/TokenList";
import useSettingsStore from "@/plugins/stores/Settings";
import { formatNumber } from "@/utils/String";

const emit = defineEmits(["saving", "saved", "deleting", "deleted"]);

const settings = useSettingsStore();

const creditAmount = ref();
const creditValue = ref(1);
const creditToken = ref(null);
const debitAmount = ref();
const debitValue = ref(1);
const debitToken = ref(null);
const transactionDate = ref(new Date());

const transactionId = ref(null);
const tokenListStore = useTokenListStore();

const transactionType = ref(true);
const transactionTypes = [
  { label: "Achat", value: 0 },
  { label: "Transfert", value: 1 },
  { label: "Vente", value: 2 },
];

const store = database.getStore("transactions");

const creditComputedAmount = computed(() =>
  calculateAmount(creditAmount.value, creditValue.value),
);
const debitComputedAmount = computed(() =>
  calculateAmount(debitAmount.value, debitValue.value),
);
const creditChangedToken = (v) => {
  creditValue.value = transactionId.value
    ? creditValue.value
    : tokenListStore.prices[v.id];
};
const debitChangedToken = (v) => {
  debitValue.value = transactionId.value
    ? debitValue.value
    : tokenListStore.prices[v.id];
};
const creditAutoCalculate = () => {
  creditAmount.value =
    (debitAmount.value * debitValue.value) / creditValue.value;
};
const debitAutoCalculate = () => {
  debitAmount.value =
    (creditAmount.value * creditValue.value) / debitValue.value;
};

const calculateAmount = (amount, value) => {
  let sum = 0;
  if (amount && value) {
    sum = amount * value;
  }

  return formatNumber(sum, settings.currencyFormat);
};

const swap = () => {
  let tmpCreditAmount = creditAmount.value;
  let tmpCreditValue = creditValue.value;
  let tmpCreditToken = creditToken.value;

  creditAmount.value = debitAmount.value;
  creditValue.value = debitValue.value;
  creditToken.value = debitToken.value;

  debitAmount.value = tmpCreditAmount;
  debitValue.value = tmpCreditValue;
  debitToken.value = tmpCreditToken;
};

const reset = (resetToken = true) => {
  creditAmount.value = "";
  debitAmount.value = "";
  transactionType.value = 0;
  transactionId.value = null;
  transactionDate.value = new Date();
  if (resetToken) {
    creditToken.value = settings.defaultToken.value;
    debitToken.value = settings.defaultToken.value;
    creditValue.value = tokenListStore.prices[settings.defaultToken.id];
    debitValue.value = tokenListStore.prices[settings.defaultToken.id];
  }
};

const fillForm = (data) => {
  reset();
  setTimeout(() => {
    if ([0, 1].includes(data.transactionType)) {
      creditAmount.value = data.creditAmount;
      creditToken.value = data.creditToken.value;
      creditValue.value = data.creditValue;
    }

    if ([1, 2].includes(data.transactionType)) {
      debitAmount.value = data.debitAmount;
      debitToken.value = data.debitToken.value;
      debitValue.value = data.debitValue;
    }
    transactionDate.value = data.date;
    transactionType.value = data.transactionType;
    transactionId.value = data.id;
  }, 0);
};

const saveTransaction = (id) => {
  if (!id) {
    id = uuid();
  }
  emit("saving");

  let toSave = {
    creditAmount: creditAmount.value,
    creditValue: creditValue.value,
    creditToken: creditToken.value,
    debitAmount: debitAmount.value,
    debitValue: debitValue.value,
    debitToken: debitToken.value,
    transactionType: transactionType.value,
    date: transactionDate.value,
  };

  if (transactionType.value === 0) {
    toSave.debitToken = null;
    toSave.debitValue = null;
    toSave.debitAmount = null;
  }
  if (transactionType.value === 2) {
    toSave.creditToken = null;
    toSave.creditValue = null;
    toSave.creditAmount = null;
  }
  store.save(id, toSave).then(() => {
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
