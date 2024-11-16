<template>
  <div class="flex flex-col p-2 gap-2 w-[30rem]">
    <!-- Calendar header -->
    <div class="flex items-center justify-between gap-2">
      <!-- Previous month button -->
      <Btn
        flat
        icon="chevron_left"
        @click="previousMonth"
      ></Btn>

      <!-- Month select-->
      <Menu
        :model-value="currentDisplayedMonth"
        @update:model-value="updateMonth"
        full-width
        :options="months"
      ></Menu>

      <!-- Year select -->
      <Menu
        :model-value="currentDisplayedYear"
        @update:model-value="updateYear"
        full-width
        :options="years"
      >
      </Menu>

      <!-- Next month button -->
      <Btn
        flat
        icon="chevron_right"
        @click="nextMonth"
      ></Btn>
    </div>

    <!-- Calendar body -->
    <div class="flex flex-col gap-2">
      <!-- Days of week line -->
      <div class="flex flex-1 items-center justify-around">
        <div
          v-for="day in days"
          class="text-center font-bold w-12"
        >
          {{ day.substring(0, 2) }}
        </div>
      </div>

      <!-- Double loop for days -->
      <div
        v-for="row in allDays"
        class="flex flex-1 items-center justify-around"
      >
        <Btn
          v-for="day in row"
          :flat="!isDayVisible(day, localModel)"
          :outlined="isDayVisible(day)"
          class="[&.secondary]:text-white/40 hover:bg-white/10 transition-colors"
          :class="{ secondary: day.month !== 'current' }"
          size="lg"
          @click="pickDay(day)"
        >
          {{ day.value }}
        </Btn>
      </div>
    </div>

    <!-- Calendar footer -->
    <div class="flex gap-2">
      <!-- Hour input-->
      <InputNumber
        :model-value="localModel.getHours()"
        @update:model-value="updateHours"
        label="Heure"
      ></InputNumber>

      <!-- Minute input -->
      <InputNumber
        :model-value="localModel.getMinutes()"
        @update:model-value="updateMinutes"
        label="Minute"
      ></InputNumber>
    </div>

    <div class="flex">
      <Btn
        @click="validate"
        class="w-full"
        >Valider</Btn
      >
    </div>
  </div>
</template>

<script setup>
import { years, months, days, daysToDisplayInAMonth } from "./useCalendar";

const emit = defineEmits(["validate"]);

// The date value of the component
const model = defineModel({ default: null });
const localModel = ref(model.value);

// The date value of the displayed view
const modelView = ref(new Date());

// The current displayed month
const currentDisplayedMonth = computed(
  () => months[modelView.value.getMonth()],
);

// The current displayed year
const currentDisplayedYear = computed(() =>
  years.find((y) => y.value === modelView.value.getFullYear()),
);

// All displayed days with a fill of the previous and the next month to displayed grayed days
const allDays = computed(() => daysToDisplayInAMonth(modelView.value));

// Is the day visible in the current month view
const isDayVisible = (day, toCompare = new Date()) => {
  if (
    modelView.value.getFullYear() === toCompare?.getFullYear() &&
    modelView.value.getMonth() === toCompare?.getMonth()
  ) {
    return day.month === "current" && day.value === toCompare?.getDate();
  }

  let tmp;

  tmp = new Date(modelView.value);
  tmp.setMonth(tmp.getMonth() - 1);
  if (
    tmp.getFullYear() === toCompare?.getFullYear() &&
    tmp.getMonth() === toCompare?.getMonth()
  ) {
    return day.month === "last" && day.value === toCompare?.getDate();
  }

  tmp = new Date(modelView.value);
  tmp.setMonth(tmp.getMonth() + 1);
  if (
    tmp.getFullYear() === toCompare?.getFullYear() &&
    tmp.getMonth() === toCompare?.getMonth()
  ) {
    return day.month === "next" && day.value === toCompare?.getDate();
  }
  return false;
};

// Update the localModel with the selected day, depending on the displayed view localModel
const pickDay = (pickedDay) => {
  if (pickedDay.month === "last") {
    previousMonth();
  } else if (pickedDay.month === "next") {
    nextMonth();
  }

  updateModel({
    year: modelView.value.getFullYear(),
    month: modelView.value.getMonth(),
    day: pickedDay.value,
  });
};

// Update the localModel with a new Date, otherwise the reactivity doesn't trigger
const updateModel = (
  value = { year: null, month: null, day: null, hour: null, minute: null },
  modelToUpdate = null,
) => {
  modelToUpdate ??= localModel;

  modelToUpdate.value = new Date(
    value.year ?? modelToUpdate.value.getFullYear(),
    value.month ?? modelToUpdate.value.getMonth(),
    value.day ?? modelToUpdate.value.getDate(),
    value.hour ?? modelToUpdate.value.getHours(),
    value.minute ?? modelToUpdate.value.getMinutes(),
  );
};

// Update the displayed view localModel to the next month
const nextMonth = () => {
  updateModel({ month: modelView.value.getMonth() + 1 }, modelView);
};

// Update the displayed view localModel to the previous month
const previousMonth = () => {
  updateModel({ month: modelView.value.getMonth() - 1 }, modelView);
};

// Update the localModel with a specific years
const updateYear = (year) => {
  updateModel({ year: year.value }, modelView);
};

// Update the localModel with a specific month
const updateMonth = (month) => {
  updateModel({ month: months.findIndex((m) => m === month) }, modelView);
};

// Update the localModel with a specific hour
const updateHours = (value) => {
  updateModel({ hour: value });
};

// Update the localModel with a specific minute
const updateMinutes = (value) => {
  updateModel({ minute: value });
};

// The final function to update to original model
const validate = () => {
  model.value = localModel.value;
  emit("validate");
};
</script>
