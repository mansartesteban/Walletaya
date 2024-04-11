<template>
  <div ref="menu" class="menu">
    <slot name="activator" v-bind="{ on: activatorEvents }">
      <!-- <div class="menu-activator" v-on="activatorEvents">
        <Icon>chevron-down</Icon>
      </div> -->
    </slot>

    <div ref="menuPanel" class="menu-panel" :class="{ opened }">
      <!-- <input class="search"> -->
      <template v-for="item in items">
        <div
          @click.native="emits('item-click', item)"
          class="option flex gap-md"
          :class="{ selected: model && item.value === model.value }"
        >
          <slot name="option-icon" v-bind="item">
            <Icon :size="20">{{ item.icon }}</Icon>
          </slot>

          <div class="select__label">
            <slot name="option-label" v-bind="item">{{ item.label }}</slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  closeOnClick: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["item-click"]);

const model = defineModel();

const activatorEvents = ref({
  onClick: toggle
})


const opened = ref(false);
const menuPanel = ref(null);

function resize() {
  let margin = 16;
  let menuWidth = 240;
  let menuHeight = 240;

  if (menuPanel.value) {
    let rect = menuPanel.value.getBoundingClientRect();

    if (rect.left <= margin) {
      menuPanel.value.style.left = [margin, "px"].join("");
    }
    if (rect.top <= margin) {
      menuPanel.value.style.top = [margin, "px"].join("");
    }

    if (rect.left + menuWidth >= window.innerWidth - margin) {
      menuPanel.value.style.left = [
        window.innerWidth - (margin + menuWidth),
        "px",
      ].join("");
    }
    if (rect.top + menuHeight >= window.innerHeight - margin) {
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
  console.log("clickked?");
  opened.value ? close() : open();
}

onClickOutside(menuPanel, (e) => close());
</script>
