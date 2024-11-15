<template>
  <div class="flex flex-col gap-4">
    <Card
      noHeader
      noFooter
    >
      <div class="flex flex-col gap-4">
        <!-- Monnaie par défaut
        <InputText
          v-model="defaultCurrencySymbol"
          label="Symbol"
          :placeholder="`Ex: £`"
        ></InputText> -->
        Format d'affichage des nombres
        <Select
          v-model="currencyFormat"
          :options="currencyFormats"
          return-value="value"
        >
          <template #activator="{ on }">
            <InputText
              v-model="currencyFormatLabel"
              @click="on.onClick"
            ></InputText>
          </template>
        </Select>
      </div>
    </Card>
    <Card>
      <Toggle
        v-model="leftHanded"
        :items="hands"
      ></Toggle>
    </Card>
    <Btn
      severity="success"
      icon="save"
      @click="save"
      >Sauvegarder</Btn
    >
  </div>
</template>

<script setup>
import useSettingsStore from "@/plugins/stores/Settings";
import useToastStore from "@/plugins/stores/Toast";

const toast = useToastStore();
const settings = useSettingsStore();

const leftHanded = ref(settings.leftHanded);
const hands = [
  { label: "Gaucher", value: true },
  { label: "Droitier", value: false },
];

const currencyFormat = ref(settings.currencyFormat);
let currencyFormats = [
  {
    label: "1 000 000,00",
    value: "space-coma",
  },
  {
    label: "1 000 000.00",
    value: "space-dot",
  },
  {
    label: "1.000.000,00",
    value: "dot-coma",
  },
  {
    label: "1,000,000.00",
    value: "coma-dot",
  },
];
const currencyFormatLabel = computed(
  () =>
    currencyFormats.find((format) => format.value === currencyFormat.value)
      .label,
);

const defaultCurrencySymbol = ref(settings.defaultCurrency);

const save = () => {
  settings.setSetting("defaultCurrency", defaultCurrencySymbol.value);
  settings.setSetting("leftHanded", leftHanded.value);
  settings.setSetting("currencyFormat", currencyFormat.value);
  toast.push("Enregistré !");
};
</script>
