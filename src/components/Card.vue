<template>
  <div class="card" :class="{ centered }">
    <div class="blurry-container">
      <div
        class="flex flex-column gap-md"
        :class="{ 'align-items-center': centered }">
        <div v-if="!noHeader && ($slots.header || title)" class="flex gap-md">
          <template v-if="$slots.header">
            <slot name="header"></slot>
          </template>
          <template v-else>
            <div class="card-title">{{ title }}</div>
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
    default: null,
  },
  centered: {
    type: Boolean,
    default: false,
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
  padding: var(--md);
  overflow: hidden;
  background: var(--glass-background);

  &.centered {
    text-align: center;
    .card-title {
      text-align: center;
    }
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
  }

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
    background: var(--glass-background);
  }

  .blurry-container {
    height: fit-content;
  }
}
</style>
