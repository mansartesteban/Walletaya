<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="absolute top-0 p-4 flex justify-center">
      <h1 class="text-2xl">Walletaya</h1>
    </div>
    <div class="">
      <Glass class="rounded-2xl p-8">
        <h2 class="flex-1 text-center pb-4">Connexion</h2>
        <Form
          class="w-80"
          :fields="fields"
          :action="Auth.login"
          :secondaryAction="secondaryAction"
        ></Form>
      </Glass>
    </div>
    <router-link
      :to="{ name: 'Register' }"
      class="text-sm pt-2"
      >Pas encore de compte ? S'inscrire</router-link
    >
  </div>
</template>

<script setup>
import Auth from "@/Services/Auth";

const fields = reactive([
  {
    name: "email",
    type: "text",
    label: "Adresse e-mail",
    value: "esteban.mansart2@gmail.com",
  },
  {
    name: "password",
    type: "password",
    label: "Mot de passe",
    value: "",
    // value: "Azerty123456",
  },
]);

const secondaryAction = reactive(
  null,
  // { icon: "fingerprint" },
);
</script>
