<template>
  <div
    class="avatar flex align-items-center justify-content-center"
    :style="style"
  >
    <template v-if="letters">
      {{ letters }}
    </template>
    <template v-else></template>
  </div>
</template>

<script setup>
import { pickRandom } from "@/utils/Array";
import { colors } from "@/theme/colors";

const props = defineProps({
  size: {
    type: String,
    default: "calc(var(--md) * 3)",
  },
  img: {
    type: String,
    default: "",
  },
  letters: {
    type: String,
    default: undefined,
    validator: (value) => value.length == 2,
  },
});

const pickedColor = ref(pickRandom(colors));

const style = computed(() => {
  return {
    background: pickedColor.value,
    width: props.size,
    height: props.size,
  };
});
</script>

<style scoped>
.avatar {
  width: calc(v-bind("size") * (1 / 1rem));
  height: calc(v-bind("size") * (1 / 1rem));
  border-radius: 999px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.33);
  outline: none;
  box-shadow: var(--shadow);
}
</style>
