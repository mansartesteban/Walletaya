<template>
  <div class="dialog" :class="{ opened }">
    <div ref="dialogPanel" class="dialog-panel">
      <Card :title="title">
        <template v-if="$slots.header" #header>
          <slot name="header"></slot>
        </template>
        <template #footer>
          <slot name="footer">
            <Btn severity="none" @click="onCancel">{{ cancelLabel }}</Btn>
            <Btn severity="primary" @click="onConfirm">{{ confirmLabel }}</Btn>
          </slot>
        </template>
        <slot></slot>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
import Btn from "@/components/Btn.vue";

import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  title: {
    type: String,
  },
  cancelLabel: {
    type: String,
    default: "Annuler",
  },
  confirmLabel: {
    type: String,
    default: "Valider",
  },
});

const emit = defineEmits(["closed", "opened", "cancel", "confirm"]);

const dialogPanel = ref(null);
const opened = defineModel("opened", { default: false });

const onCancel = () => {
  close();
  emit("cancel");
};

const onConfirm = () => {
  emit("confirm");
};

const open = () => {
  opened.value = true;
  emit("opened");
};

const close = () => {
  opened.value = false;
  emit("closed");
};

const toggle = () => {
  opened.value ? close() : open();
};

onClickOutside(dialogPanel, (e) => {
  close();
});

defineExpose({
  open,
  close,
  toggle,
});
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(black, 0);
  pointer-events: none;

  transition: all var(--transition-timing) var(--transition-duration);

  &.opened {
    background: rgba(black, 0.75);
    pointer-events: all;

    .dialog-panel {
      top: 50%;
    }
  }

  .dialog-panel {
    transition: all var(--transition-timing) var(--transition-duration);
    position: absolute;
    top: -100%;
    transform: translateY(-50%);
    left: var(--xl);
    right: var(--xl);
  }
}
</style>
