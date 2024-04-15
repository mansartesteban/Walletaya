<template>
  <div class="app-header">
    <div
      class="appbar flex align-items-center justify-content-space-between gap-md p-md"
    >
      <div class="flex flex-1 align-items-center gap-md">
        <img
          src="/assets/icons/dollars.png"
          style="height: calc(var(--md) * 3); width: calc(var(--md) * 3)"
        />
        <div class="page-title">{{ route.meta.title }}</div>
      </div>
      <Btn icon="refresh" @click="refresh" flat></Btn>
      <Avatar
        src="https://avatars.githubusercontent.com/u/25709401?s=96&v=4"
      ></Avatar>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
import { useRoute } from "vue-router";
import Btn from "@/components/Btn.vue";
import useTokenStore from "@/plugins/stores/TokenList";

const route = useRoute();

const tokenStore = useTokenStore();

const refresh = () => {
  tokenStore.refresh(true);
};
</script>
