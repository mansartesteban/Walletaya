<template>
  <div class="page flex flex-column gap-md p-md">
    <Card noHeader noFooter>
      <div class="form-group">
        <InputText
          label="Prénom"
          :placeholder="`Ex: ${pickRandom(firstnames)}`"
        ></InputText>
        <InputText
          label="Nom"
          :placeholder="`Ex: ${pickRandom(lastnames)}`"
        ></InputText>
      </div>
    </Card>

    <Card noHeader noFooter>
      <div class="flex flex-column gap-md">
        Monnaie par défaut
        <InputText
          v-model="defaultCurrencySymbol"
          label="Symbol"
          :placeholder="`Ex: £`"
        ></InputText>
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
      <Toggle v-model="leftHanded" :items="hands"></Toggle>
    </Card>
    <Btn severity="success" icon="save" @click="save">Sauvegarder</Btn>
  </div>
</template>

<script setup>
import InputText from "@/components/forms/InputText.vue";
import Btn from "@/components/Btn.vue";
import Card from "@/components/Card.vue";
import Toggle from "@/components/forms/ButtonGroup.vue";
import Select from "@/components/forms/Select.vue";

import { pickRandom } from "@/utils/Array";
import firstnames from "@/faker/firstnames";
import lastnames from "@/faker/lastnames";

import useSettingsStore from "@/plugins/stores/Settings";
import { computed } from "vue";

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
      .label
);

const defaultCurrencySymbol = ref(settings.defaultCurrency);

const save = () => {
  settings.setSetting("defaultCurrency", defaultCurrencySymbol.value);
  settings.setSetting("leftHanded", leftHanded.value);
  settings.setSetting("currencyFormat", currencyFormat.value);
};
</script>
