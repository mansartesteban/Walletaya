<template>
  <div class="flex flex-col p-4 gap-4">
    <div class="flex items-center justify-between gap-4">
      <Btn
        flat
        icon="chevron_left"
        @click="previousMonth"
      ></Btn>
      <Menu
        :model-value="currentMonth"
        @update:model-value="updateMonth"
        full-width
        :options="months"
      >
        <template #activator="{ on, model }">
          <Btn
            flat
            class="flex-1"
            v-bind="on"
            >{{ model?.label }}</Btn
          >
        </template>
      </Menu>
      <Menu
        :model-value="currentYear"
        @update:model-value="updateYear"
        full-width
        :options="years"
      >
        <template #activator="{ on }">
          <Btn
            flat
            class="flex-1"
            v-bind="on"
            >{{ modelView.getFullYear() }}</Btn
          ></template
        ></Menu
      >
      <Btn
        flat
        icon="chevron_right"
        @click="nextMonth"
      ></Btn>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-1 items-center gap-4">
        <div
          v-for="day in weekDays"
          class="text-center font-bold w-12"
        >
          {{ day.label.substring(0, 2) }}
        </div>
      </div>

      <div
        v-for="row in monthDays"
        class="flex flex-1 items-center justify-between gap-4"
      >
        <Btn
          v-for="day in row"
          :flat="!isCurrentDayModel(day)"
          :outlined="isCurrentDay(day)"
          class="px-1 py-4 [&.secondary]:text-white/40"
          :class="{ secondary: day.secondary }"
          size="lg"
          @click="pickDay(day)"
        >
          {{ day.value }}
        </Btn>
      </div>
    </div>
  </div>
</template>

<script setup>
const model = defineModel({ default: null });
const modelView = ref(new Date());
// const model = ref(new Date(2024, 10, 30));

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

const years = [...new Array(200)].map((v, k) => ({
  label: k + 1900,
  value: k + 1900,
}));

const currentMonth = computed(() => months[modelView.value.getMonth()]);

const updateMonth = (month) => {
  modelView.value = new Date(
    modelView.value.getFullYear(),
    month.value - 1,
    modelView.value.getDate(),
  );
};
const currentYear = computed(() =>
  years.find((y) => y.value === modelView.value.getFullYear()),
);

const updateYear = (year) => {
  modelView.value = new Date(
    year.value,
    modelView.value.getMonth(),
    modelView.value.getDate(),
  );
};

const monthDays = computed(() => {
  let localModel = new Date(modelView.value);
  localModel.setDate(1);
  localModel.setHours(0);
  localModel.setMinutes(0);
  localModel.setSeconds(0);
  let firstDayOfCurrentMonth = localModel.getUTCDay();

  let lastDaysOfLastMonth = [
    ...new Array(
      new Date(localModel.getFullYear(), localModel.getMonth(), 0).getDate(),
    ),
  ]
    .map((v, k) => k + 1)
    .reverse()
    .slice(0, firstDayOfCurrentMonth)
    .reverse();

  let daysOfCurrentMonth = [
    ...new Array(
      new Date(
        localModel.getFullYear(),
        localModel.getMonth() + 1,
        0,
      ).getDate(),
    ),
  ].map((v, k) => k + 1);

  let lastDayOfCurrentMonth =
    (localModel.getUTCDay() + daysOfCurrentMonth.length) % 7;
  let firstDaysOfNextMonth = [
    ...new Array(
      new Date(
        localModel.getFullYear(),
        localModel.getMonth() + 2,
        0,
      ).getDate(),
    ),
  ]
    .map((v, k) => k + 1)
    .slice(0, 7 - lastDayOfCurrentMonth);

  let everyDays = [
    ...lastDaysOfLastMonth.map((day) => ({
      value: day,
      secondary: true,
      month: "last",
    })),
    ...daysOfCurrentMonth.map((day) => ({
      value: day,
      secondary: false,
      month: "current",
    })),
    ...firstDaysOfNextMonth.map((day) => ({
      value: day,
      secondary: true,
      month: "next",
    })),
  ];

  let retValue = [];
  const chunkSize = 7;

  for (let i = 0; i < everyDays.length; i += chunkSize) {
    retValue.push(everyDays.slice(i, i + chunkSize));
  }

  return retValue;
});

const nextMonth = () => {
  modelView.value = new Date(
    modelView.value.getFullYear(),
    modelView.value.getMonth() + 1,
    modelView.value.getDate(),
  );
};

const previousMonth = () => {
  modelView.value = new Date(
    modelView.value.getFullYear(),
    modelView.value.getMonth() - 1,
    modelView.value.getDate(),
  );
};

const pickDay = (pickedDay) => {
  if (pickedDay.month === "last") {
    previousMonth();
  } else if (pickedDay.month === "next") {
    nextMonth();
  }

  model.value = new Date(
    modelView.value.getFullYear(),
    modelView.value.getMonth(),
    pickedDay.value,
  );
};

const isCurrentDay = (day) => {
  let today = new Date();
  if (
    modelView.value.getFullYear() === today?.getFullYear() &&
    modelView.value.getMonth() === today?.getMonth()
  ) {
    return day.month === "current" && day.value === today?.getDate();
  }

  let tmp;

  tmp = new Date(modelView.value);
  tmp.setMonth(tmp.getMonth() - 1);
  if (
    tmp.getFullYear() === today?.getFullYear() &&
    tmp.getMonth() === today?.getMonth()
  ) {
    return day.month === "last" && day.value === today?.getDate();
  }

  tmp = new Date(modelView.value);
  tmp.setMonth(tmp.getMonth() + 1);
  if (
    tmp.getFullYear() === today?.getFullYear() &&
    tmp.getMonth() === today?.getMonth()
  ) {
    return day.month === "next" && day.value === today?.getDate();
  }
  return false;
};

const isCurrentDayModel = (day) => {
  if (
    modelView.value.getFullYear() === model.value?.getFullYear() &&
    modelView.value.getMonth() === model.value?.getMonth()
  ) {
    return day.month === "current" && day.value === model.value?.getDate();
  }

  let tmp;

  tmp = new Date(modelView.value);
  tmp.setMonth(tmp.getMonth() - 1);
  if (
    tmp.getFullYear() === model.value?.getFullYear() &&
    tmp.getMonth() === model.value?.getMonth()
  ) {
    return day.month === "last" && day.value === model.value?.getDate();
  }

  tmp = new Date(modelView.value);
  tmp.setMonth(tmp.getMonth() + 1);
  if (
    tmp.getFullYear() === model.value?.getFullYear() &&
    tmp.getMonth() === model.value?.getMonth()
  ) {
    return day.month === "next" && day.value === model.value?.getDate();
  }
  return false;
};
</script>
