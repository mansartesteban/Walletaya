import useTokenStore from "@/plugins/stores/TokenList";
import useSettingsStore from "@/plugins/stores/Settings";

const settings = useSettingsStore();
const tokenStore = useTokenStore();

export const getToken = (tokenToFind = 0) => {
  let onKey = "value";
  if (typeof tokenToFind === "number") {
    onKey = "id";
  }

  return tokenStore.tokenList.find((token) => token[onKey] === tokenToFind);
};

export const amount = (value, noSymbol = false, fractionDigit = 2) => {
  return value
    ?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: noSymbol ? 8 : fractionDigit,
      minimumFractionDigits: fractionDigit,
    })
    .replace("$", noSymbol ? "" : `${settings.defaultCurrency || "$"} `);
};
