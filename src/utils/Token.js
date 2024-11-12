import useTokenStore from "@/plugins/stores/TokenList";
import useSettingsStore from "@/plugins/stores/Settings";
import { formatNumber } from "@/utils/String";

const settings = useSettingsStore();
const tokenStore = useTokenStore();

export const getToken = (tokenToFind = 0, onKey = "value") => {
  if (typeof tokenToFind === "number") {
    onKey = "id";
  }

  return tokenStore.tokenList.find((token) => token[onKey] === tokenToFind);
};

export const amount = (value, noSymbol = false, fractionDigit = 2) => {
  if (!value) return "";
  return (
    formatNumber(value, settings.currencyFormat) +
    (noSymbol ? "" : ` ${settings.defaultCurrency || " $"}`)
  );
};
