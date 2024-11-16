export const useOption = (option) => {
  if (typeof option === "object") {
    return option;
  } else {
    return {
      value: option,
      label: option,
    };
  }
};
