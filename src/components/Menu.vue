<template>
  <div
    ref="menu"
    class="group"
    :class="{ 'w-full': fullWidth, opened }"
  >
    <template v-if="!noActivator">
      <slot
        name="activator"
        v-bind="{ on: activatorEvents }"
      >
        <Btn
          class="menu-activator"
          icon="chevron-down"
          @click="activatorEvents.onClick"
        >
          <slot
            name="activator-label"
            v-bind="{ option: model }"
          ></slot>
        </Btn>
      </slot>
    </template>
    <div
      ref="menuPanel"
      class="glass shadow-xl outline-none translate-y-2 [&:not(.opened)]:border-none w-60 p-0 fixed z-[100] h-0 rounded-2xl overflow-clip before:content-[''] before:absolute before:top-0 before:left-0 before:min-h-full before:flex-1 before:w-full before:z-[-1] [&.opened]:h-auto"
      :class="{ opened }"
    >
      <!-- :style="fullWidth
            ? 'z-index: 10000; bottom: 0; left: 0; right: 0; width: unset'
            : ''" -->
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
        ></Btn>
      </div>
      <RecycleScroller
        :items="filteredOptions"
        :item-size="48"
        key-field="value"
        v-slot="{ item: option }"
        class="flex flex-col overflow-clip max-h-60"
      >
        <slot
          name="option"
          v-bind="{ on: optionEvents, option: option }"
        >
          <div
            @click="optionEvents.onClick(option)"
            class="flex items-center gap-4 p-4 user-select-none h-12 [&.selected]:bg-primary [&.selected]:border-t [&.selected]:border-b border-white/20 mt-[-1px] drop-shadow-md"
            :class="{ selected: model && option.value === model.value }"
          >
            <slot
              name="option-icon"
              v-bind="{ option: option }"
            >
              <Icon :size="20">{{ option.icon }}</Icon>
            </slot>

            <slot
              name="option-label"
              v-bind="{ option: option }"
            >
              {{ option.label }}
            </slot>
          </div>
        </slot>
      </RecycleScroller>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
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
      ? props.options.find((option) => option[props.returnValue] === v)
      : v,
  set: (v) => (props.returnValue ? v[props.returnValue] : v),
});
const searchText = ref("");
const opened = ref(false);
const fullWidth = ref(false);
const localPosition = ref({ x: 0, y: 0 });
const computedPosition = computed(() => props.position || localPosition.value);

const activatorEvents = ref({
  onClick: onActivatorClick,
});

const optionEvents = ref({
  onClick: selectValue,
});
const menu = ref(null);
const menuPanel = ref(null);

const filteredOptions = computed(() => {
  let filteredOptions = searchFunction(searchText.value, props.options);
  return props.sortFunction
    ? filteredOptions.sort((a, b) => props.sortFunction(a, b, searchText.value))
    : filteredOptions;
});

function onActivatorClick(e) {
  let box = menuPanel.value.getBoundingClientRect();
  localPosition.value.x = box.left;
  localPosition.value.y = box.top;
  toggle();
}

function selectValue(option) {
  if (option.callback) {
    option.callback(option);
  }

  model.value = option;

  emit("option-clicked", option);
  if (!props.persistOnClick) {
    close();
  }
}

const clearValue = () => {
  model.value = null;
  emit("cleared");
};

function resize() {
  nextTick(() => {
    if (fullWidth) {
      let margin = 16;
      let menuWidth = 240;
      let menuHeight = 240;

      let left = computedPosition.value.x;
      let top = computedPosition.value.y;

      menuPanel.value.style.left = [left, "px"].join("");
      menuPanel.value.style.top = [top, "px"].join("");

      if (left < margin) {
        menuPanel.value.style.left = [margin, "px"].join("");
      }
      if (top < margin) {
        menuPanel.value.style.top = [margin, "px"].join("");
      }

      if (left + menuWidth > window.innerWidth - margin) {
        menuPanel.value.style.left = [
          window.innerWidth - (margin + menuWidth),
          "px",
        ].join("");
      }
      if (top + menuHeight > window.innerHeight - margin) {
        menuPanel.value.style.top = [
          window.innerHeight - (margin + menuHeight),
          "px",
        ].join("");
      }
    }
  });
}

const searchInput = ref();
const focus = (e) => {
  fullWidth.value = true;
};

const unfocus = (e) => {};

const open = () => {
  resize();
  opened.value = true;
  nextTick(() => {
    if (props.search) {
      searchInput.value.focus();
    }
  });
};

const close = () => {
  searchText.value = "";
  opened.value = false;
  fullWidth.value = false;
};

const toggle = () => {
  opened.value ? close() : open();
};

onClickOutside(menuPanel, close);

defineExpose({
  open,
  close,
  toggle,
});
</script>
