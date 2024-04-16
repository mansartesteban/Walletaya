<template>
  <div ref="menu" class="menu">
    <template v-if="!noActivator">
      <slot name="activator" v-bind="{ on: activatorEvents }">
        <div class="menu-activator" v-on="activatorEvents">
          <Icon>chevron-down</Icon>
        </div>
      </slot>
    </template>
    <div ref="menuPanel" class="menu-panel" :class="{ opened }">
      <InputText
        v-model="searchText"
        label="Recherche un token"
        class="search m-sm"
      />
      <RecycleScroller
        :items="filteredOptions"
        :item-size="48"
        key-field="value"
        v-slot="{ item: option }"
        class="blurry-container overflow-x-hidden"
      >
        <slot name="option" v-bind="{ on: optionEvents, option: option }">
          <div
            @click="optionEvents.onClick(option)"
            class="option flex gap-md"
            :class="{ selected: model && option.value === model.value }"
          >
            <slot name="option-icon" v-bind="{ option: option }">
              <Icon :size="20">{{ option.icon }}</Icon>
            </slot>

            <slot name="option-label" v-bind="{ option: option }">
              {{ option.label }}
            </slot>
          </div>
        </slot>
      </RecycleScroller>
    </div>
  </div>
  <slot></slot>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import InputText from "@/components/forms/InputText.vue";
import { onClickOutside } from "@vueuse/core";
import { search } from "@/utils/String";
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
});

const emit = defineEmits(["option-clicked"]);

const model = defineModel();
const searchText = ref("");
const opened = ref(false);
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
  let filteredOptions = search(searchText.value, props.options);
  return props.sortFunction
    ? filteredOptions.sort((a, b) => props.sortFunction(a, b, searchText.value))
    : filteredOptions;
});

function onActivatorClick(e) {
  localPosition.value.x = e.target.offsetLeft;
  localPosition.value.y = e.target.offsetTop + 48;
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

function resize() {
  let margin = 16;
  let menuWidth = 240;
  let menuHeight = 240;

  if (menuPanel.value) {
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
}

function open() {
  opened.value = true;
  resize();
}

function close() {
  opened.value = false;
}

function toggle() {
  opened.value ? close() : open();
}

onClickOutside(menuPanel, (e) => close());

onMounted(() => {});

defineExpose({
  open,
  close,
  toggle,
});
</script>
