<template>
  <!-- <Btn class="mb-md" @click="importCMC">Import</Btn> -->
  <div class="flex flex-col gap-4 p-4">
    <TokenPicker v-model="model"></TokenPicker>
    <DatePicker v-model="modelDate"></DatePicker>
  </div>
  <br />
</template>

<script setup>
import { v4 as uuid } from "uuid";
import { getToken } from "@/utils/Token";
import database from "@/plugins/database";
import useToastStore from "@/plugins/stores/Toast";

const model = ref();
const modelDate = ref(new Date(2024, 5, 6));

const toast = useToastStore();

const importCMC = async () => {
  const res = await fetch("/Binance_with_transaction_history.csv", {
    method: "get",
    headers: {
      "content-type": "text/csv;charset=UTF-8",
    },
  });

  if (res.status === 200) {
    const lines = (await res.text())
      .split(/[\n\r]+/g)
      .slice(1)
      .map((line) =>
        line
          .split('","')
          .map((info) => info.replace(/^"/, "").replace(/"$/, "")),
      );

    const store = database.getStore("transactions");
    // Date (UTC+1:00),Token,Type,Price (EUR),Amount,Total value (EUR),Fee,Fee Currency,Notes

    for (let i in lines) {
      let line = lines[i];
      let id = uuid();

      console.log("line", line);

      let toSave = {
        creditAmount: null,
        creditValue: null,
        creditToken: null,
        debitAmount: null,
        debitValue: null,
        debitToken: null,
        transactionType: null,
        date: new Date(line[0]),
      };

      if (line[2] === "buy") {
        toSave.transactionType = 0;
      } else if (line[2] === "sell") {
        toSave.transactionType = 2;
      }

      if (toSave.transactionType === 0) {
        toSave.creditToken = getToken(line[1], "symbol").value;
        toSave.creditValue = parseFloat(line[3]);
        toSave.creditAmount = parseFloat(line[4]);
      }
      if (toSave.transactionType === 2) {
        toSave.debitToken = getToken(line[1], "symbol").value;
        toSave.debitValue = parseFloat(line[3]);
        toSave.debitAmount = parseFloat(line[4]);
      }

      await store.save(id, toSave);
      console.log("saved line", i, id);
      if (i % 10 === 0) {
        toast.push("Importé " + i);
      }
    }

    toast.push("Importé");
  }
};
</script>

<style scoped></style>
