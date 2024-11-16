<template>
  <div
    ref="menu"
    :class="[{ 'w-full': fullWidth || internalFullWidth, opened }]"
  >
    <template v-if="!noActivator">
      <slot
        name="activator"
        v-bind="{ on: activatorEvents, model }"
      >
        <MenuOption
          :option="model"
          v-bind="activatorEvents"
        >
          <template
            v-if="model.icon"
            #option-icon="slotProps"
          >
            <slot
              name="option-icon"
              v-bind="slotProps"
            ></slot>
          </template>
          <template
            v-if="model.label"
            #option-label="slotProps"
          >
            <slot
              name="option-label"
              v-bind="slotProps"
            ></slot>
          </template>
        </MenuOption>
      </slot>
    </template>

    <Overlay
      v-model:opened="opened"
      class="w-60"
    >
      <div
        v-if="search || clearable"
        class="flex h-16 p-2 gap-2"
      >
        <InputText
          v-if="search"
          ref="searchInput"
          v-model="searchText"
          @focus="focus"
          label="Rechercher un token"
        />
        <Btn
          v-if="clearable"
          @click="clearValue"
          icon="close"
          size="lg"
        ></Btn>
      </div>
      <RecycleScroller
        ref="scroller"
        :items="filteredOptions"
        :item-size="itemSize"
        key-field="value"
        v-slot="{ item: option }"
        class="flex flex-col overflow-clip max-h-60"
      >
        <slot
          name="option"
          v-bind="{ on: optionEvents, option: option }"
        >
          <MenuOption
            :option="option"
            v-bind="optionEvents"
            :model="model"
          >
            <template #option-icon="slotProps">
              <slot
                name="option-icon"
                v-bind="slotProps"
              ></slot>
            </template>
            <template #option-label="slotProps">
              <slot
                name="option-label"
                v-bind="slotProps"
              ></slot>
            </template>
          </MenuOption>
        </slot>
      </RecycleScroller>
    </Overlay>
  </div>
</template>

<script setup>
import { search as searchFunction } from "@/utils/String";
import { RecycleScroller } from "vue-virtual-scroller";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  persistOnClick: {
    type: Boolean,
    default: false,
  },
  noActivator: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Object,
    default: null,
  },
  sortFunction: {
    type: Function,
    default: null,
  },
  search: {
    type: Boolean,
    default: false,
  },
  returnValue: {
    type: String,
    default: null,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["option-clicked", "cleared"]);

const model = defineModel({
  get: (v) => v,
  set: (v) => (props.returnValue ? v[props.returnValue] : v),
});
const scroller = ref();
const searchText = ref("");
const opened = defineModel("opened", {
  type: Boolean,
  default: false,
});
const internalFullWidth = ref(false);
const itemSize = ref(48);

const menu = ref(null);

const filteredOptions = computed(() => {
  let filteredOptions = searchFunction(searchText.value, props.options);
  return props.sortFunction
    ? filteredOptions.sort((a, b) => props.sortFunction(a, b, searchText.value))
    : filteredOptions;
});

const onActivatorClick = (e) => {
  toggle();
};

const selectValue = (option) => {
  if (option.callback) {
    option.callback(option);
  }

  model.value = option;

  emit("option-clicked", option);
  if (!props.persistOnClick) {
    close();
  }
};

const activatorEvents = ref({
  onClick: onActivatorClick,
});

const optionEvents = ref({
  onClick: selectValue,
});

const clearValue = () => {
  model.value = null;
  emit("cleared");
};

const searchInput = ref();
const focus = (e) => {
  internalFullWidth.value = true;
};

const open = () => {
  opened.value = true;

  nextTick(() => {
    if (model.value) {
      let foundOptionIndex = props.options.findIndex((option) =>
        props.returnValue
          ? option[props.returnValue] === model.value[props.returnValue]
          : option === model.value,
      );
      scroller.value.scrollToItem(foundOptionIndex - 2);
    }
    if (props.search) {
      searchInput.value.focus();
    }
  });
};

const close = () => {
  opened.value = false;
  searchText.value = "";
  internalFullWidth.value = false;
};

const toggle = () => {
  opened.value ? close() : open();
};

onMounted(() => {});

defineExpose({
  open,
  show: open,
  close,
  hide: close,
  toggle,
});
</script>
