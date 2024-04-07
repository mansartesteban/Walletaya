<template>
  <!-- <div class="calculator-activator">
        <Btn @click="open">
            <Icon>calculator</Icon>
        </Btn>
    </div> -->
  <Widget :widgetInstance="calculator">
    <div class="calculator flex flex-column align-items-stretch p-sm gap-sm">
      <div class="calculator-screen p-md">
        <template v-if="calculation">
          {{ calculation }}
        </template>
        <template v-else>0</template>
        <br />
        {{ localModel }}
        <!-- <template v-if="model">
                    {{ model }}
                </template>
                <template v-else>0</template> -->
      </div>
      <div class="calculator-keypad gap-sm">
        <Btn class="calculator-key" @touchstart.passive="clear">C</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('/')">/</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('*')">
          <Icon>x-mark</Icon>
        </Btn>
        <Btn class="calculator-key" @touchstart.passive="removeLastCalculation">
          <Icon>backspace</Icon>
        </Btn>

        <Btn class="calculator-key" @touchstart.passive="concatCalculation('7')">7</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('8')">8</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('9')">9</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('-')">-</Btn>

        <Btn class="calculator-key" @touchstart.passive="concatCalculation('4')">4</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('5')">5</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('6')">6</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('+')">+</Btn>

        <Btn class="calculator-key" @touchstart.passive="concatCalculation('1')">1</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('2')">2</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('3')">3</Btn>
        <Btn class="calculator-key" @touchstart.passive="copy">
          <Icon>copy</Icon>
        </Btn>

        <Btn class="calculator-key" @touchstart.passive="concatCalculation('%')">%</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('0')">0</Btn>
        <Btn class="calculator-key" @touchstart.passive="concatCalculation('.')">.</Btn>
        <Btn class="calculator-key" style="background: var(--color-primary)" @click="save">=</Btn>
      </div>
    </div>
  </Widget>
</template>

<script setup>
import Btn from "@/components/Btn.vue"
import Icon from "@/components/Icon.vue"
import Widget from "@/components/widgets/Widget.vue"
import WidgetService from "@/Services/WidgetService"

const calculator = WidgetService.Calculator

const model = defineModel()
const localModel = ref(0)

const calculation = ref("")

function save() {
  compute()
  model.value = localModel.value
  calculation.value = localModel.value
  compute()
}

function copy() {
  navigator.clipboard.writeText(model.value)
}

function compute() {
  localModel.value = eval(calculation.value)
}

function concatCalculation(character = "") {
  calculation.value += character
  compute()
}

function removeLastCalculation() {
  calculation.value = calculation.value.substr(0, calculation.value.length - 1)
  if (calculation.value.length === 0) {
    calculation.value = ""
  }
  compute()
}

function clear() {
  calculation.value = ""
  compute()
}
</script>

<style scoped>
.calculator {
  height: fill-available;
  flex: 1;
  /* border: 1px solid yellow; */
}

.calculator * {
  user-select: none;
}

.calculator-screen {
  /* margin: var(--sm); */
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.75rem;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.calculator-keypad {
  /* height: 100%; */
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  user-select: none;
  /* border: 1px solid red; */
}

.calculator .calculator-key {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
}
</style>
