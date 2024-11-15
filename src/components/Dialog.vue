<template>
  <div
    class="group group-dialog fixed top-0 bottom-0 left-0 right-0 pointer-events-none [&.opened]:bg-black/35 [&.opened]:pointer-events-auto"
    :class="{ opened, centered }"
  >
    <div
      ref="dialogPanel"
      class="absolute -top-full -translate-y-1/2 left-8 right-8 group-[.group-dialog.opened]:top-1/2"
    >
      <Card
        :title="title"
        :centered="centered"
      >
        <template
          v-if="$slots.header"
          #header
        >
          <slot name="header"></slot>
        </template>
        <template #footer>
          <slot name="footer">
            <Btn
              severity="none"
              @click="onCancel"
              icon="close"
              >{{ cancelLabel }}</Btn
            >
            <Btn
              severity="primary"
              @click="onConfirm"
              icon="check"
              >{{ confirmLabel }}</Btn
            >
          </slot>
        </template>
        <slot></slot>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  title: {
    type: String,
  },
  centered: {
    type: Boolean,
    default: false,
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
