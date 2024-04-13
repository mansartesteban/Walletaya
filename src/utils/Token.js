import tokens from "@/datas/tokens";

export const getToken = (value) =>
  tokens.find((token) => token.value === value);

export const amount = (value, noSymbol = false) => {
  return value
    ?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: noSymbol ? 8 : 2,
      minimumFractionDigits: 2,
    })
    .replace("$", noSymbol ? "" : "$");
};
