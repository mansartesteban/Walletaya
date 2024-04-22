<template>
  <div
    class="app-header appbar flex align-items-center justify-content-space-between gap-md p-md"
    :class="{ 'flex-reverse': settings.leftHanded }">
    <div class="flex align-items-center gap-md">
      <img
        src="/assets/icons/dollars.png"
        style="height: calc(var(--md) * 3); width: calc(var(--md) * 3)" />
      <div class="page-title">{{ route.meta.title }}</div>
    </div>
    <div class="flex gap-md" :class="{ 'flex-reverse': settings.leftHanded }">
      <Btn icon="refresh" @click="refresh" flat></Btn>
      <Avatar
        src="https://avatars.githubusercontent.com/u/25709401?s=96&v=4"></Avatar>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
import { useRoute } from "vue-router";
import Btn from "@/components/Btn.vue";
import useAppStore from "@/plugins/stores/App";
import useTokenListStore from "@/plugins/stores/TokenList";

import useSettingsStore from "@/plugins/stores/Settings";

const route = useRoute();

const appStore = useAppStore();
const settings = useSettingsStore();
const tokenListStore = useTokenListStore();

const refresh = () => {
  tokenListStore.refreshTokens(true, appStore.usedTokens);
};
</script>
