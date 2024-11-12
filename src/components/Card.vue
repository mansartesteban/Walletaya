<template>
  <div
    class="group/card glass outline-none border border-white/10 rounded-2xl relative p-4 overflow-clip bg-glass shadow-lg [&.centered]:text-center"
    :class="{ centered }"
  >
    <div class="blurry-container">
      <div
        class="flex flex-col gap-4"
        :class="{ 'items-center': centered }"
      >
        <div
          v-if="!noHeader && ($slots.header || title)"
          class="flex gap-4"
        >
          <slot name="header">
            <div
              class="group-hover/card[.centered]:text-center text-xl font-bold"
            >
              {{ title }}
            </div>
          </slot>
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
