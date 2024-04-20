<template>
  <div class="m-xl">
    <DatePicker v-model="date" timePicker></DatePicker>
  </div>
</template>

<script setup>
import DatePicker from "@/components/forms/DatePicker.vue";
const date = ref(null);
</script>

<style scoped></style>
