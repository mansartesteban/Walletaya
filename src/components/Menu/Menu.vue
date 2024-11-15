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
        <Btn
          class="menu-activator"
          icon="keyboard_arrow_down"
          @click="activatorEvents.onClick"
        >
          <slot
            name="activator-label"
            v-bind="{ option: model }"
          ></slot>
        </Btn>
      </slot>
    </template>

    <Overlay
      v-model:opened="opened"
      ref="menuPanel"
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
          @blur="unfocus"
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
        style="scrollbar-gutter: stable"
      >
        <slot
          name="option"
          v-bind="{ on: optionEvents, option: option }"
        >
          <Btn
            @click="optionEvents.onClick(option)"
            :flat="option.value !== model?.value"
            class="flex items-center gap-4 p-4 user-select-none h-12 [&.selected]:bg-primary [&.selected]:border-t [&.selected]:border-b border-white/20 mt-[-1px] drop-shadow-md"
            :class="{
              selected: model && option.value === model.value,
            }"
          >
            <slot
              name="option-icon"
              v-bind="{ option: option }"
            >
              <span
                v-if="option.icon"
                class="mi"
                >{{ option.icon }}</span
              >
            </slot>

            <slot
              name="option-label"
              v-bind="{ option: option }"
            >
              <div
                v-if="option.label"
                class="text-ellipsis overflow-clip whitespace-nowrap min-w-0"
              >
                {{ option.label }}
              </div>
            </slot>
          </Btn>
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
  get: (v) =>
    props.returnValue
      ? props.options.find((option) =>
          props.returnValue ? option[props.returnValue] === v : option === v,
        )
      : v,
  set: (v) => (props.returnValue ? v[props.returnValue] : v),
});
const scroller = ref();
const searchText = ref("");
const opened = defineModel("opened", {
  type: Boolean,
  default: false,
});
const internalFullWidth = ref(false);
const localPosition = ref({ x: 0, y: 0 });
const itemSize = ref(48);

const menu = ref(null);
const menuPanel = ref(null);

const filteredOptions = computed(() => {
  let filteredOptions = searchFunction(searchText.value, props.options);
  return props.sortFunction
    ? filteredOptions.sort((a, b) => props.sortFunction(a, b, searchText.value))
    : filteredOptions;
});

const onActivatorClick = (e) => {
  let box = menuPanel.value.$el.getBoundingClientRect();
  localPosition.value.x = box.left;
  localPosition.value.y = box.top;
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

const resize = () => {
  nextTick(() => {
    let box = menuPanel.value.$el.getBoundingClientRect();

    if (box.x + box.width > window.innerWidth) {
      menuPanel.value.$el.style.right = "16px";
    }
    if (box.y + box.height > window.innerHeight) {
      menuPanel.value.$el.style.bottom = "16px";
    }
    if (box.x < 16) {
      menuPanel.value.$el.style.left = "16px";
    }
    if (box.y < 16) {
      menuPanel.value.$el.style.top = "16px";
    }
  });
};

const searchInput = ref();
const focus = (e) => {
  internalFullWidth.value = true;
};

const unfocus = (e) => {};

const open = () => {
  opened.value = true;
  resize();
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
