export const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre ",
  "Décembre",
];

export const years = [...new Array(200)].map((v, k) => ({
  label: k + 1900,
  value: k + 1900,
}));

export const daysToDisplayInAMonth = (referenceDay = new Date()) => {
  // The model to play with in the function
  let localModel = new Date(referenceDay);
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

  // The concatenation of all days
  let everyDays = [
    ...lastDaysOfLastMonth.map((day) => ({
      value: day,
      month: "last",
    })),
    ...daysOfCurrentMonth.map((day) => ({
      value: day,
      month: "current",
    })),
    ...firstDaysOfNextMonth.map((day) => ({
      value: day,
      month: "next",
    })),
  ];

  let retValue = [];
  const chunkSize = 7;

  for (let i = 0; i < everyDays.length; i += chunkSize) {
    retValue.push(everyDays.slice(i, i + chunkSize));
  }

  return retValue;
};
