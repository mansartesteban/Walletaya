<template>
  <article
    class="snap-start overflow-y-auto scrollbar-none p-4 [&.no-gutters]:p-0"
    :class="{ 'no-gutters': noGutters }"
    :id="computedAnchor"
  >
    <slot></slot>
  </article>
</template>

<script setup>
const props = defineProps({
  noGutters: {
    type: Boolean,
    default: false,
  },
  anchor: {
    type: String,
    required: true,
    validator: (v) => {
      if (!v) {
        throw "You must provide a anchor to make tabs system working";
      }

      if (typeof v !== "string") {
        throw "The property 'anchor' must be a string";
      }
      return true;
    },
  },
});

const computedAnchor = computed(() => props.anchor.replace("#", ""));
</script>

<script>
export default {
  name: "Tab",
};
</script>
