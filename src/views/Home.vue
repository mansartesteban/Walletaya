<template>
  <div class="p-md">
    <Btn class="mb-md" @click="importCMC">Import</Btn>
    <TokenPicker v-model="model"></TokenPicker>
  </div>
  <!-- <div class="flex flex-column gap-md">
    <img src="https://picsum.photos/id/237/200/300" width="200" height="300" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus
      suscipit eligendi est quia fuga nisi provident amet error eius culpa,
      necessitatibus ratione. Ullam laudantium aperiam sequi et. Voluptatum, ea?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus
      suscipit eligendi est quia fuga nisi provident amet error eius culpa,
      necessitatibus ratione. Ullam laudantium aperiam sequi et. Voluptatum, ea?
    </p>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus
      suscipit eligendi est quia fuga nisi provident amet error eius culpa,
      necessitatibus ratione. Ullam laudantium aperiam sequi et. Voluptatum, ea?
    </p>
    <hr style="border-bottom: 2px solid red" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus
      suscipit eligendi est quia fuga nisi provident amet error eius culpa,
      necessitatibus ratione. Ullam laudantium aperiam sequi et. Voluptatum, ea?
    </p>
    <img src="https://picsum.photos/200/300" width="200" height="300" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus
      suscipit eligendi est quia fuga nisi provident amet error eius culpa,
      necessitatibus ratione. Ullam laudantium aperiam sequi et. Voluptatum, ea?
    </p>
    <img src="https://picsum.photos/40/50" width="40" height="50" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus
      suscipit eligendi est quia fuga nisi provident amet error eius culpa,
      necessitatibus ratione. Ullam laudantium aperiam sequi et. Voluptatum, ea?
    </p>
  </div> -->
</template>

<script setup>
import TokenPicker from "@/components/TokenPicker.vue"
import Btn from "@/components/Btn.vue"
import { v4 as uuid } from "uuid"
import { getToken } from "@/utils/Token"
import database from "@/plugins/database"

const model = ref()

const importCMC = async () => {
  const res = await fetch("/Binance_with_transaction_history.csv", {
    method: 'get',
    headers: {
      'content-type': 'text/csv;charset=UTF-8',
    }
  })

  if (res.status === 200) {

    const lines = (await res.text()).split(/[\n\r]+/g).slice(1).map(line => line.split("\",\"").map(info => info.replace(/^"/, "").replace(/"$/, "")))

    const store = database.getStore("transactions")
    // Date (UTC+1:00),Token,Type,Price (EUR),Amount,Total value (EUR),Fee,Fee Currency,Notes

    for (let i in lines) {
      let line = lines[i]
      let id = uuid()

      console.log("line", line)

      let toSave = {
        creditAmount: null,
        creditValue: null,
        creditToken: null,
        debitAmount: null,
        debitValue: null,
        debitToken: null,
        transactionType: null,
        date: new Date(line[0]),
      }

      if (line[2] === "buy") {
        toSave.transactionType = 0
      } else if (line[2] === "sell") {
        toSave.transactionType = 2
      }

      if (toSave.transactionType === 0) {
        toSave.creditToken = getToken(line[1], "symbol").value
        toSave.creditValue = parseFloat(line[3])
        toSave.creditAmount = parseFloat(line[4])
      }
      if (toSave.transactionType === 2) {
        toSave.debitToken = getToken(line[1], "symbol").value
        toSave.debitValue = parseFloat(line[3])
        toSave.debitAmount = parseFloat(line[4])
      }


      await store.save(id, toSave)
      console.log("saved line", i, id)
    }

  }
}
</script>

<style scoped>
.test {
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
}
</style>
