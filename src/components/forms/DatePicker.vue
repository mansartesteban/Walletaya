<template>
  <InputText
    :modelValue="dateDisplay(date)"
    label="Date de transaction"
    @click="drawerOpened = true"
    readOnly
  ></InputText>
  <Drawer v-model:opened="drawerOpened">
    <div class="date-picker flex flex-column gap-md">
      Date
      <div class="flex gap-md">
        <WheelPicker v-model="modelDay" :items="days"></WheelPicker>
        <WheelPicker v-model="modelMonth" :items="months"></WheelPicker>
        <WheelPicker v-model="modelYear" :items="years"></WheelPicker>
      </div>
      <template v-if="timePicker">
        Heure
        <div class="flex gap-md">
          <WheelPicker v-model="modelHour" :items="hours"></WheelPicker>
          <WheelPicker v-model="modelMinute" :items="minutes"></WheelPicker>
        </div>
      </template>
      <Btn @click="validate">Valider</Btn>
    </div>
  </Drawer>
</template>

<script setup>
import WheelPicker from "./WheelPicker.vue";
import Drawer from "@/components/Drawer.vue";
import Btn from "@/components/Btn.vue";
import InputText from "@/components/forms/InputText.vue";
import { dateDisplay } from "@/utils/Date";

const props = defineProps({
  timePicker: {
    type: Boolean,
    default: false,
  },
});

const date = defineModel({
  get: (v) => {
    if (v) {
      if (typeof v === "string") {
        v = new Date(v);
      }
      modelMinute.value = v.getMinutes().toString().padStart(2, "0");
      modelHour.value = v.getHours().toString().padStart(2, "0");
      modelDay.value = v.getDate();
      modelMonth.value = v.getMonth() + 1;
      modelYear.value = v.getFullYear();
    }
    return v;
  },
  default: new Date(),
});

const drawerOpened = ref(false);

const now = new Date();
const modelMinute = ref(0);
const modelHour = ref(0);
const modelDay = ref(0);
const modelMonth = ref(0);
const modelYear = ref(0);

const validate = () => {
  date.value = new Date(
    modelYear.value,
    modelMonth.value - 1,
    modelDay.value,
    modelHour.value,
    modelMinute.value
  );
  drawerOpened.value = false;
};

const years = computed(() => {
  let y = [];
  for (let i = 1970; i <= now.getFullYear() + 50; i++) {
    y.push(i);
  }
  return y;
});
const months = [
  {
    label: "Jan",
    value: 1,
  },
  {
    label: "Fév",
    value: 2,
  },
  {
    label: "Mars",
    value: 3,
  },
  {
    label: "Avr",
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
    label: "Juil",
    value: 7,
  },
  {
    label: "Août",
    value: 8,
  },
  {
    label: "Sept",
    value: 9,
  },
  {
    label: "Oct",
    value: 10,
  },
  {
    label: "Nov",
    value: 11,
  },
  {
    label: "Déc",
    value: 12,
  },
];
const days = computed(() =>
  [...new Array(new Date(2024, modelMonth.value, 0).getDate())].map(
    (v, k) => k + 1
  )
);
const hours = [...new Array(24)].map((v, k) => k.toString().padStart(2, "0"));
const minutes = [...new Array(12 * 5)].map((v, k) =>
  k.toString().padStart(2, "0")
);

const setModel = (d) => {
  if (!d) {
    d = new Date();
  }
  modelMinute.value = d.getMinutes().toString().padStart(2, "0");
  modelHour.value = d.getHours().toString().padStart(2, "0");
  modelDay.value = d.getDate();
  modelMonth.value = d.getMonth() + 1;
  modelYear.value = d.getFullYear();
  date.value = d;
};

onMounted(() => {
  setModel(props.modelValue);
});
</script>

<style scoped lang="scss"></style>
