<template>
  <div class="m-xl">
    <DatePicker v-model="date"></DatePicker>
  </div>
</template>

<script setup>
import DatePicker from "@/components/forms/DatePicker.vue";
const date = ref(null);
</script>

<style scoped></style>
