<template>
  <div class="m-xl flex flex-column gap-md">
    <!-- <DatePicker v-model="date" timePicker></DatePicker>
     -->

    <div v-for="num in numbers">
      {{ formatNumber(num, numberFormat) }}
    </div>

    {{ numberFormat }}
  </div>
</template>

<script setup>
import DatePicker from "@/components/forms/DatePicker.vue";

import { formatNumber } from "@/utils/String";
const date = ref(null);

let numbers = [
  99999999.99999, 123456789.123456789, 12, 1.9999, 1234.99, 50000, 63546.32345,
];
</script>

<style scoped></style>
