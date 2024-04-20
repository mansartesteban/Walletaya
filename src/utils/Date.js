export const dateDisplay = (date) =>
  [
    date?.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    date?.toLocaleTimeString("fr-FR"),
  ].join(" - ");
