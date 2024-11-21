<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="absolute top-0 p-4 flex justify-center">
      <h1 class="text-2xl">Walletaya</h1>
    </div>
    <div class="">
      <Glass class="p-8 rounded-2xl w-80 flex flex-col gap-4">
        <div class="flex-1 text-center pb-4">Inscription</div>
        <InputText
          v-model="user.firstname"
          label="Prénom"
        ></InputText>
        <InputText
          v-model="user.lastname"
          label="Nom"
        ></InputText>
        <InputText
          v-model="user.email"
          label="Adresse email"
        ></InputText>
        <InputText
          v-model="user.password"
          label="Mot de passe"
        ></InputText>
        <InputText
          v-model="user.confirmPassword"
          label="Confirmation du mot de passe"
        ></InputText>
        <Btn @click="register">S'inscrire</Btn>
      </Glass>
    </div>
    <router-link
      :to="{ name: 'Login' }"
      class="text-sm pt-2"
      >Déjà inscrit ? Se connecter</router-link
    >
  </div>
</template>

<script setup>
const user = reactive({
  firstname: "Esteban",
  lastname: "Mansart",
  email: "esteban.mansart2@gmail.com",
  password: "Azerty123456",
  confirmPassword: "",
});

import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

const register = () => {
  axiosInstance
    .post("/auth/register", {
      ...user,
    })
    .then((response) => {
      console.log("response", response);
    });
  // <!-- /auth/register -->
};
</script>
