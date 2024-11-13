<template>
  <div
    ref="select"
    :class="{ mini }"
  >
    <Menu
      :modelValue="model"
      :options="options"
      :return-value="returnValue"
      @optionClicked="selectOption"
      @cleared="clearValue"
      :sortFunction="sortFunction"
      :clearable="clearable"
      v-bind="$attrs"
    >
      <template #activator="{ on }">
        <slot
          v-if="model"
          name="activator"
          v-bind="{ on, option: model }"
        >
          <div
            class="bg-black/35 outline outline-1 outline-[var(--primary-color)] rounded-2xl px-1 py-2 h-12 w-12 flex flex-col items-center justify-center"
            @click="on.onClick"
          >
            <slot
              v-if="model"
              name="selected-option-mini-icon"
              v-bind="{ option: model }"
            >
              <div v-if="icon"></div>
            </slot>
            <slot
              v-if="model"
              name="selected-option-mini-label"
              v-bind="{ option: model }"
            >
              <div v-if="label"></div>
            </slot>
          </div>
        </slot>
      </template>

      <template #option="{ on, option }">
        <slot
          name="option"
          v-bind="{ option }"
          v-on="on"
        ></slot>
      </template>
      <template #option-icon="{ option }">
        <slot
          name="option-icon"
          v-bind="{ option }"
        ></slot>
      </template>
      <template #option-label="{ option }">
        <slot
          name="option-label"
          v-bind="{ option }"
        ></slot>
      </template>
    </Menu>
  </div>
</template>

<script setup>
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
  sortFunction: {
    type: Function,
    default: null,
  },
  returnValue: {
    type: String,
    default: null,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["changed"]);

const select = ref();

const model = defineModel();

const selectOption = (option) => {
  model.value = props.returnValue ? option[props.returnValue] : option;
  emit("changed", option);
};

const clearValue = () => {
  model.value = null;
  emit("changed", null);
};
</script>
