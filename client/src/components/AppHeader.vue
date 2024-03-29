<template>
  <div class="app-header">
    <div
      class="appbar flex align-items-center justify-content-space-between px-md"
    >
      <div class="flex align-items-center gap-md">
        <img src="/assets/icons/dollars.png" width="48" height="48" />
        <div class="page-title">{{ route.meta.title }}</div>
      </div>
      <Avatar letters="EM"></Avatar>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped>
.app-header {
  box-shadow: var(--shadow);
  background: var(--primary);
}

.appbar {
  height: var(--header-height);
  background: var(--primary);
  height: 64px;
}
</style>
