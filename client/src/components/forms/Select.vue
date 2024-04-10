<template>
  <div ref="select" class="select flex flex-column gap-md" :class="{ mini }">
    <div
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
        <!-- <Icon>chevron-down</Icon> -->
      </template>
    </div>
    <Menu
      :modelValue="model"
      :items="items"
      @itemClick="selectItem"
      closeOnCLick
    >
      <!-- <template
        v-for="slot in slots"
        #[slot]="slotProps"
        v-bind="slotProps"
      ></template> -->
    </Menu>
  </div>
</template>

<script setup>
import Menu from "@/components/Menu.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "Sélectionner une valeur",
  },
  mini: {
    type: Boolean,
    default: false,
  },
});

const select = ref();

const model = defineModel();

function selectItem(item) {
  model.value = item;
}
</script>

<style scoped>
svg {
  color: white;
}
</style>
