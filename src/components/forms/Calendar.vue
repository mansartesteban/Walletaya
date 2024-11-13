<template>
  <div class="flex flex-col p-4 gap-4">
    <div class="flex items-center justify-between gap-4">
      <span class="mi">chevron_left</span>
      <div>Nov</div>
      <div>2024</div>
      <span class="mi">chevron_right</span>
    </div>
    <div class="flex items-center gap-4">
      <div v-for="day in weekDays">{{ day.label.substring(0, 2) }}</div>
    </div>
  </div>
</template>

<script setup>
const weekDays = [
  {
    label: "Lundi",
    value: 1,
  },
  {
    label: "Mardi",
    value: 2,
  },
  {
    label: "Mercredi",
    value: 3,
  },
  {
    label: "Jeudi",
    value: 4,
  },
  {
    label: "Vendredi",
    value: 5,
  },
  {
    label: "Samedi",
    value: 6,
  },
  {
    label: "Dimanche",
    value: 7,
  },
];
</script>
