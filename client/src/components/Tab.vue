<template>
  <article class="tab-content" :id="computedAnchor">
    <slot></slot>
  </article>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "[Onglet]",
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
