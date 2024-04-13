<template>
  <div class="app-header">
    <div
      class="appbar flex align-items-center justify-content-space-between px-md"
    >
      <div class="flex align-items-center gap-md">
        <img
          src="/assets/icons/dollars.png"
          style="height: calc(var(--md) * 3); width: calc(var(--md) * 3)"
        />
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
