<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col flex-1 gap-4"
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
    <Btn submit>{{ submitLabel }}</Btn>
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
});

const model = reactive({});
const errors = reactive({});

const onSubmit = (e) => {
  console.log("e", e, props.action);
  props
    .action(model)
    .then((response) => {
      console.log("response", response);
      if (response.errors) {
        response.errors.forEach(
          (error) => (errors[error.field] = error.message),
        );
      }
    })
    .catch((response) => {
      console.log("response (err)", response);
      response.errors.forEach((error) => (errors[error.field] = error.message));
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
