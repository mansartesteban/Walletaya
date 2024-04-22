<template>
  <Tabs>
    <Tab title="Préférences" anchor="preferences">
      <Preferences></Preferences>
    </Tab>
    <Tab title="Securité" anchor="security">
      <Security></Security>
    </Tab>
  </Tabs>
</template>

<script setup>
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";

import Preferences from "./Preferences.vue";
import Security from "./Security.vue";
</script>
