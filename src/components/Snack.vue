<template>
  <div class="fixed bottom-20 left-16 right-16 flex flex-col-reverse gap-4">
    <Message
      centered
      v-for="toast in toasts.toasts"
      :type="toast.type"
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
