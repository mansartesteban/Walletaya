export const clamp = (a, min, max) => Math.min(Math.max(a, min), max);

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
