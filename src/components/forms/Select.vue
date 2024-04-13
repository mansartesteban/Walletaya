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
      <!-- <template v-if="slots?.option" #option="{ on, option }">
        <slot name="option" v-bind="{ on, option }"></slot>
      </template> -->
      <!-- weh slots {{ slots }} -->

      <template v-for="slot in $slots" #[slot]="slotProps">
        <slot :name="slot" v-bind="slotProps"></slot>
      </template>

      <!-- <template v-if="slots?.optionIcon">
        <slot name="option-icon" v-bind="{ option }">
          <template #option-icon="{ option }">test</template>
        </slot>
      </template> -->
      <!-- <template v-if="slot.option"> -->
      <!-- <slot name="option-label" v-bind="{ option }"></slot> -->
      <!-- </template> -->
      <!-- <template v-else> -->
      <!-- <slot name="option-icon" v-bind="{ option }"></slot> -->
      <!-- <slot name="option-label" v-bind="{ option }"></slot> -->
      <!-- </template> -->
    </Menu>

    <!-- <div
      class="select__header flex align-items-center"
      :class="mini ? 'justify-content-center' : 'justify-content-space-between'"
    >
      <template v-if="mini">
        <slot name="selected-option-mini" v-bind="model"></slot>
      </template>
      <template v-else>
        <template v-if="model">
          <div class="option flex gap-md">
            <slot name="selected-option-icon" v-bind="model"></slot>

            <div class="select__label">
              <slot name="selected-option-label" v-bind="model">{{
                model.label
              }}</slot>
            </div>
          </div>
        </template>
        <template v-else>
          <span class="select__label">{{ label }}</span>
        </template>
      </template>
    </div> -->
    <!-- <slot></slot> -->
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

const emits = defineEmits(["changed"]);

const select = ref();

const model = defineModel();

function selectOption(option) {
  model.value = option;
  emits("changed", model.value);
}
</script>

<style scoped>
svg {
  color: white;
}
</style>
