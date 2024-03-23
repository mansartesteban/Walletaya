<template>
    <div class="calculator-activator">
        <Btn @click="open">
            <Icon>calculator</Icon>
        </Btn>
    </div>
    <Window title="Calculatrice" icon="calculator">
        <div class="calculator">
            <div class="calculator-screen"></div>
            <div class="calculator-keypad">

            </div>
        </div>
    </Window>
</template>

<script setup>
import Btn from "@/components/Btn.vue"
import Icon from "@/components/Icon.vue"
import Window from "@/components/Window.vue"

const model = defineModel()

function open() {
    console.log("clicked")
}
</script>

<style scoped>
.calculator {}

.calculator-keypad {
    display: grid;
}
</style>