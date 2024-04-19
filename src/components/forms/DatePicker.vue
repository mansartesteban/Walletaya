<template>
  <div class="date-picker flex gap-xl">
    <WheelPicker v-model="modelDay" :items="days"></WheelPicker>
    <WheelPicker v-model="modelMonth" :items="months"></WheelPicker>
    <WheelPicker v-model="modelYear" :items="years"></WheelPicker>
  </div>
</template>

<script setup>
import WheelPicker from "./WheelPicker.vue";
import Btn from "@/components/Btn.vue";

const date = defineModel();

const now = new Date();
const modelDay = ref(0);
const modelMonth = ref(0);
const modelYear = ref(0);

const years = computed(() => {
  let y = [];
  for (let i = 1970; i <= now.getFullYear() + 50; i++) {
    y.push(i);
  }
  return y;
});
const months = [
  {
    label: "Janvier",
    value: 1,
  },
  {
    label: "Février",
    value: 2,
  },
  {
    label: "Mars",
    value: 3,
  },
  {
    label: "Avril",
    value: 4,
  },
  {
    label: "Mai",
    value: 5,
  },
  {
    label: "Juin",
    value: 6,
  },
  {
    label: "Juillet",
    value: 7,
  },
  {
    label: "Août",
    value: 8,
  },
  {
    label: "Septembre",
    value: 9,
  },
  {
    label: "Octobre",
    value: 10,
  },
  {
    label: "Novembre",
    value: 11,
  },
  {
    label: "Décembre",
    value: 12,
  },
];
const days = computed(() =>
  [...new Array(new Date(2024, modelMonth.value, 0).getDate())].map(
    (v, k) => k + 1
  )
);

onMounted(() => {
  modelDay.value = now.getDate();
  modelMonth.value = now.getMonth() + 1;
  modelYear.value = now.getFullYear();
});
</script>

<style scoped lang="scss"></style>
