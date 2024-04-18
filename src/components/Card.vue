<template>
  <div class="card">
    <div class="blurry-container">
      <div class="flex flex-column gap-md">
        <div v-if="!noHeader" class="flex gap-md">
          <template v-if="$slots.header">
            <slot name="header"></slot>
          </template>
          <template v-else>
            <h1>{{ title }}</h1>
          </template>
        </div>

        <div class="">
          <slot>CARD</slot>
        </div>

        <div v-if="!noFooter && $slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  noHeader: {
    type: Boolean,
    default: false,
  },
  noFooter: {
    type: Boolean,
    defautl: false,
  },
});
</script>

<style scoped lang="scss">
.card {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px;
  outline: none;
  border: none;
  transition: var(--transition-menus);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  padding: var(--lg);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    flex: 1;
    width: 100%;
    z-index: -1;
    backdrop-filter: blur(var(--sm));
    border-radius: var(--border-radius);
    background: rgba(255, 255, 255, 0.02);
  }

  .blurry-container {
    height: fit-content;
  }
}
</style>
