<template>
  <div class="page flex flex-column gap-md">
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

import { pickRandom } from "@/utils/Array";
import firstnames from "@/faker/firstnames";
import lastnames from "@/faker/lastnames";

import useSettingsStore from "@/plugins/stores/Settings";

const settings = useSettingsStore();

const leftHanded = ref(settings.leftHanded);
const hands = [
  { label: "Gaucher", value: true },
  { label: "Droitier", value: false },
];

const defaultCurrencySymbol = ref(settings.defaultCurrency);

const save = () => {
  settings.setSetting("defaultCurrency", defaultCurrencySymbol.value);
  settings.setSetting("leftHanded", leftHanded.value);
};
</script>
