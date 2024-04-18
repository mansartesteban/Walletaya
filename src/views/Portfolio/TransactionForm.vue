<template>
  <div class="transaction-form flex flex-column gap-md">
    <div class="form-line">
      <ButtonGroup
        v-model="transactionType"
        :items="transactionTypes"
      ></ButtonGroup>
    </div>
    <Card noHeader v-if="[1, 2].includes(transactionType)">
      <div class="flex flex-column gap-md">
        Débit
        <div
          class="form-line flex gap-md"
          :class="{ 'flex-reverse': settings.leftHanded }"
        >
          <InputNumber
            v-model="debitAmount"
            label="Montant"
            :append="debitSelectedToken?.symbol"
          >
          </InputNumber>
          <Btn
            v-if="transactionType === 1"
            icon="magic"
            @click="debitAutoCalculate"
          ></Btn>
          <TokenPicker
            v-model="debitSelectedToken"
            @changed="debitChangedToken"
          ></TokenPicker>
        </div>
        <div class="form-line flex gap-md">
          <InputNumber
            v-model="debitValue"
            label="Valeur"
            append="USDT"
          ></InputNumber>
        </div>
        <div class="amount-display flex align-items-center gap-xs negative">
          <div>- {{ debitComputedAmount }}</div>
          <div>USTD</div>
        </div>
      </div>
    </Card>

    <Btn
      v-if="transactionType === 1"
      icon="exchange"
      class="my-n-xl mx-auto"
      size="lg"
      rounded
      style="z-index: 1"
      @click="swap"
    ></Btn>

    <Card noHeader v-if="[0, 1].includes(transactionType)">
      <div class="flex flex-column gap-md">
        Crédit
        <div
          class="form-line flex gap-md"
          :class="{ 'flex-reverse': settings.leftHanded }"
        >
          <InputNumber
            v-model="creditAmount"
            label="Montant"
            :append="creditSelectedToken?.symbol"
          >
          </InputNumber>
          <Btn
            v-if="transactionType === 1"
            icon="magic"
            @click="creditAutoCalculate"
          ></Btn>
          <TokenPicker
            v-model="creditSelectedToken"
            @changed="creditChangedToken"
          ></TokenPicker>
        </div>
        <div class="form-line flex gap-md">
          <InputNumber
            v-model="creditValue"
            label="Valeur"
            append="USDT"
          ></InputNumber>
        </div>
        <div class="amount-display flex align-items-center gap-xs positive">
          <div>+ {{ creditComputedAmount }}</div>
          <div>USTD</div>
        </div>
      </div>
    </Card>

    <div class="flex gap-md" :class="{ 'flex-reverse': settings.leftHanded }">
      <!-- v-if="transactionId" -->
      <Btn
        v-if="transactionId"
        @click="deleteTransaction(transactionId)"
        severity="error"
        elevated
      >
        <Icon>delete</Icon>
        Supprimer
      </Btn>
      <Btn @click="saveTransaction(transactionId)" elevated severity="success">
        <Icon>save</Icon>
        {{ transactionId ? "Modifier" : "Ajouter" }}
      </Btn>
    </div>
  </div>
</template>

<script setup>
import Btn from "@/components/Btn.vue";
import Card from "@/components/Card.vue";
import InputNumber from "@/components/forms/InputNumber.vue";
import TokenPicker from "@/components/TokenPicker.vue";
import ButtonGroup from "@/components/forms/ButtonGroup.vue";
import Icon from "@/components/Icon.vue";
import { v4 as uuid } from "uuid";
import database from "@/plugins/database";
import useTokenListStore from "@/plugins/stores/TokenList";
import useSettingsStore from "@/plugins/stores/Settings";

const emit = defineEmits(["saving", "saved", "deleting", "deleted"]);

const settings = useSettingsStore();

const creditAmount = ref();
const creditValue = ref(1);
const creditSelectedToken = ref(null);
const debitAmount = ref();
const debitValue = ref(1);
const debitSelectedToken = ref(null);

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
  calculateAmount(creditAmount.value, creditValue.value)
);
const debitComputedAmount = computed(() =>
  calculateAmount(debitAmount.value, debitValue.value)
);
const creditChangedToken = (v) => {
  creditValue.value = tokenListStore.prices[v.id];
};
const debitChangedToken = (v) => {
  debitValue.value = tokenListStore.prices[v.id];
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

  return sum
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    .replace("$", "");
};

const swap = () => {
  let tmpCreditAmount = creditAmount.value;
  let tmpCreditValue = creditValue.value;
  let tmpCreditSelectedToken = creditSelectedToken.value;

  creditAmount.value = debitAmount.value;
  creditValue.value = debitValue.value;
  creditSelectedToken.value = debitSelectedToken.value;

  debitAmount.value = tmpCreditAmount;
  debitValue.value = tmpCreditValue;
  debitSelectedToken.value = tmpCreditSelectedToken;
};

const reset = (resetToken = true) => {
  creditAmount.value = "";
  debitAmount.value = "";
  transactionType.value = 0;
  transactionId.value = null;
  if (resetToken) {
    creditSelectedToken.value = settings.defaultToken.value;
    debitSelectedToken.value = settings.defaultToken.value;
    creditValue.value = tokenListStore.prices[settings.defaultToken.id];
    debitValue.value = tokenListStore.prices[settings.defaultToken.id];
  }
};

const fillForm = (data) => {
  creditAmount.value = data.creditAmount;
  creditSelectedToken.value = data.creditToken.value;
  creditValue.value = data.creditValue;
  debitAmount.value = data.debitAmount;
  debitSelectedToken.value = data.debitToken.value;
  debitValue.value = data.debitValue;
  transactionType.value = data.transactionType;
  transactionId.value = data.value;
};

const saveTransaction = (id) => {
  if (!id) {
    id = uuid();
  }
  emit("saving");
  store
    .save(id, {
      creditAmount: creditAmount.value,
      creditValue: creditValue.value,
      creditToken: creditSelectedToken.value,
      debitAmount: debitAmount.value,
      debitValue: debitValue.value,
      debitToken: debitSelectedToken.value,
      transactionType: transactionType.value,
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
