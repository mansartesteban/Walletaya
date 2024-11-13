<template>
  <div
    class="bg-primary flex items-center justify-between gap-4 p-4 h-16"
    :class="{ 'flex-row-reverse': settings.leftHanded }"
  >
    <div class="flex items-center gap-4">
      <img
        src="/assets/icons/dollars.png"
        class="h-12 w-12"
      />
      <div class="page-title">{{ route.meta.title }}</div>
    </div>
    <div
      class="flex items-center gap-4"
      :class="{ 'flex-reverse': settings.leftHanded }"
    >
      <Btn
        icon="sync"
        @click="refresh"
        flat
        iconSize="sm"
      ></Btn>
      <Avatar
        src="https://avatars.githubusercontent.com/u/25709401?s=96&v=4"
      ></Avatar>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
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
