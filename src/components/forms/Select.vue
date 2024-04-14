<template>
  <div ref="select" class="select" :class="{ mini }">
    <Menu :modelValue="model" :options="options" @optionClicked="selectOption">
      <template #activator="{ on }">
        <slot v-if="model" name="activator" v-bind="{ on, option: model }">
          <div class="select-activator" @click="on.onClick">
            <slot
              v-if="model"
              name="selected-option-mini-icon"
              v-bind="{ option: model }"
            >
              <div v-if="icon" class="select-activator-icon"></div>
            </slot>
            <slot
              v-if="model"
              name="selected-option-mini-label"
              v-bind="{ option: model }"
            >
              <div v-if="label" class="select-activator-label"></div>
            </slot>
          </div>
        </slot>
      </template>

      <template #option="{ on, option }">
        <slot name="option" v-bind="{ option }" v-on="on"></slot>
      </template>
      <template #option-icon="{ option }">
        <slot name="option-icon" v-bind="{ option }"></slot>
      </template>
      <template #option-label="{ option }">
        <slot name="option-label" v-bind="{ option }"></slot>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import Menu from "@/components/Menu.vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "Sélectionner une valeur",
  },
  icon: {
    type: String,
    default: "",
  },
  mini: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["changed"]);

const select = ref();

const model = defineModel();

function selectOption(option) {
  model.value = option;
  emit("changed", option);
}
</script>

<style scoped>
svg {
  color: white;
}
</style>
