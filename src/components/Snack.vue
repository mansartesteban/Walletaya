<template>
  <div class="toast-container flex flex-column flex-reverse gap-md">
    <Message
      centered
      v-for="toast in toasts.toasts"
      :type="toast.type"
      class="p-xs"
    >
      {{ toast }}
    </Message>
  </div>
</template>

<script setup>
import Message from "@/components/Message.vue";

import useToastStore from "@/plugins/stores/Toast";

const toasts = useToastStore();
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  bottom: calc(var(--navbar-height) + var(--md));
  left: var(--xl);
  right: var(--xl);
}
</style>
