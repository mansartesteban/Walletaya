import { ref } from "vue";

const settings = ref({
  defaultTokenFrom: "USDT",
  defaultTokenTo: "BTC",
  defaultCurrency: "€",
});

export default () => {
  return settings.value;
};
