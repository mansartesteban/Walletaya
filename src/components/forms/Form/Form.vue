<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col flex-1 gap-4"
  >
    <Message
      v-if="mainError"
      severity="error"
      >{{ mainError }}</Message
    >
    <Input
      v-for="field in fields"
      v-model="model[field.name]"
      :name="field.name"
      :type="field.type"
      :label="field.label"
      :messages="errors[field.name]"
      @input="clearError(field.name)"
    ></Input>
    <div class="flex gap-4">
      <Btn
        class="flex-1"
        submit
        >{{ submitLabel }}</Btn
      >
      <Btn
        v-if="secondaryAction"
        v-bind="secondaryAction"
      ></Btn>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  fields: {
    type: Array,
    validator: (v) => {
      let properties = ["name", "label"];

      if (
        !v.every((field) => properties.every((property) => property in field))
      ) {
        throw new Error(
          `Fields defined for <Form> must contain this properties : ${properties.join(", ")}`,
        );
      }

      return true;
    },
  },
  formTitle: {
    type: String,
    default: "",
  },
  action: {
    type: Function,
    default: null,
  },
  submitLabel: {
    type: String,
    default: "Envoyer",
  },
  secondaryAction: {
    type: Object,
    default: null,
  },
});

const model = reactive({});
const errors = reactive({});
const mainError = ref(null);

const onSubmit = (e) => {
  props.action(model).then((response) => {
    if (response.errors) {
      response.errors.forEach((error) => (errors[error.field] = error.message));
    }
    mainError.value = response.message;
  });
};

const clearError = (fieldName) => {
  if (errors[fieldName]) {
    errors[fieldName] = null;
  }
};

/**
 * When a new field is detected, creates a new prop for model and errors corresponding to this new field
 */
watch(
  props.fields,
  () => {
    props.fields.forEach((field) => {
      if (model[field.name] === undefined) {
        model[field.name] = field.value || null;
      }
      if (errors[field.name]) {
        errors[field.name] = null;
      }
    });
  },
  { immediate: true },
);
</script>
