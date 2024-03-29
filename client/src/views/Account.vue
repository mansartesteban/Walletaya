<template>
  <div>
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
  </div>
</template>

<script setup>
import InputText from "@/components/forms/InputText.vue";

import { pickRandom } from "@/utils/Array";
import firstnames from "@/faker/firstnames";
import lastnames from "@/faker/lastnames";
</script>
