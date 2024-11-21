<template>
  <div>
    <component
      :is="input"
      v-bind="{ ...$attrs, ...inputs[props.type].attrs }"
    ></component>
    <div
      v-for="message in computedMessages"
      :class="message.severity"
      class="text-xs [&.error]:text-red-600 [&.success]:text-green-600 [&.info]:text-sky-600 [&.warning]:text-amber-600 pt-1"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script>
const inputs = {
  text: {
    is: () => import("@/components/Forms/Inputs/InputText.vue"),
    attrs: {
      type: "text",
    },
  },
  number: {
    is: () => import("@/components/Forms/Inputs/InputText.vue"),
    attrs: {
      type: "number",
    },
  },
  password: {
    is: () => import("@/components/Forms/Inputs/InputPassword.vue"),
  },
};
</script>

<script setup>
import useInputMessage from "./composables/use-input-message";

const props = defineProps({
  type: {
    type: String,
    default: "text",
    validator: (v) => {
      let isKnownInputType = Object.keys(inputs).includes(v);

      if (!isKnownInputType) {
        throw new Error(
          `Input type must be one of these values : ${Object.keys(inputs).join(", ")}`,
        );
      }
      return isKnownInputType || v === undefined;
    },
  },
  messages: {
    type: [String, Object, Array],
    default: [],
  },
  /**
   * If true, error messages will not disappear on typing
   * If false, error messages will disappear on typing
   */
  // persistErrors: {
  //   type: Boolean,
  //   default: false,
  // },
});
const input = computed(() =>
  defineAsyncComponent({
    loader: inputs[props.type].is,
  }),
);

const computedMessages = computed(() => useInputMessage(props.messages));
</script>
