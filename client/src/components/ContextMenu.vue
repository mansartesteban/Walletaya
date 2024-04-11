<template>
  <div class="context-menu">
    <Menu
      ref="menu"
      noActivator
      :options="contextMenu.items.value"
      :position="contextMenu.position.value"
    ></Menu>
  </div>
</template>

<script setup>
import Menu from "@/components/Menu.vue";
import useContextMenu from "@/composables/useContextMenu";

const contextMenu = useContextMenu();
const menu = ref();
contextMenu.onOpen(() => menu.value.open());
</script>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
