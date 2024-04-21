<template>
  <Card noFooter title="Authentification">
    <div class="flex flex-column gap-md">
      <div class="flex flex-column gap-sm">
        <div class="flex gap-md">
          <Icon v-if="userInformations.firstname.length === 0" color="error"
            >error</Icon
          >
          <Icon v-else color="success">success</Icon>
          <div>Prénom : {{ userInformations.firstname }}</div>
        </div>
        <div class="flex gap-md">
          <Icon v-if="userInformations.lastname.length === 0" color="error"
            >error</Icon
          >
          <Icon v-else color="success">success</Icon>
          <div>Nom : {{ userInformations.lastname }}</div>
        </div>
        <div class="flex gap-md">
          <Icon v-if="userInformations.mail.length === 0" color="error"
            >error</Icon
          >
          <Icon v-else color="success">success</Icon>
          <div>Mail : {{ userInformations.mail }}</div>
        </div>
      </div>
      <div v-if="!hasInformationsDefined" class="text-justify">
        <Message severity="info">
          Pour sécuriser votre compte, vous devez d'abord ajouter des
          informations de sécurité qui nous permettrons de vous authentifier.
        </Message>
      </div>
      <Btn @click="register">{{
        hasInformationsDefined ? "Modifier les informations" : "Définir"
      }}</Btn>
      <Btn
        v-if="!appStore.userCredentials"
        @click="securize"
        :disabled="!hasInformationsDefined"
        >Sécuriser le compte</Btn
      >
      <Btn v-else severity="error" @click="unsecurize">Retirer la sécurité</Btn>
    </div>
  </Card>

  <Dialog v-model:opened="authDialogOpened" @confirm="onConfirm">
    <div class="flex flex-column gap-md">
      <InputText
        v-model="dialogUserInformations.firstname"
        label="Prénom"
      ></InputText>
      <InputText
        v-model="dialogUserInformations.lastname"
        label="Nom"
      ></InputText>
      <InputText
        v-model="dialogUserInformations.mail"
        label="Adresse e-mail"
      ></InputText>
    </div>
  </Dialog>
</template>

<script setup>
import Card from "@/components/Card.vue";
import Icon from "@/components/Icon.vue";
import Message from "@/components/Message.vue";
import Dialog from "@/components/Dialog.vue";
import Btn from "@/components/Btn.vue";
import InputText from "@/components/forms/InputText.vue";

import useSettingsStore from "@/plugins/stores/Settings";
import useAppStore from "@/plugins/stores/App";
import { generateRandomChallenge } from "@/utils/Security";

const appStore = useAppStore();
const settings = useSettingsStore();

const authDialogOpened = ref(false);

const userInformations = ref({
  firstname: "",
  lastname: "",
  mail: "",
});
const dialogUserInformations = ref({
  firstname: "",
  lastname: "",
  mail: "",
});

const hasInformationsDefined = computed(() => {
  return (
    userInformations.value.firstname.length > 0 &&
    userInformations.value.lastname.length > 0 &&
    userInformations.value.mail.length > 0
  );
});

const register = () => {
  authDialogOpened.value = true;
  dialogUserInformations.value.firstname = userInformations.value.firstname;
  dialogUserInformations.value.lastname = userInformations.value.lastname;
  dialogUserInformations.value.mail = userInformations.value.mail;
};

const onConfirm = () => {
  userInformations.value.firstname = dialogUserInformations.value.firstname;
  userInformations.value.lastname = dialogUserInformations.value.lastname;
  userInformations.value.mail = dialogUserInformations.value.mail;
  settings.setSetting("userInformations", userInformations.value);
  authDialogOpened.value = false;
};

const securize = async () => {
  navigator.credentials
    .create({
      publicKey: {
        challenge: generateRandomChallenge(),
        rp: { name: "Progressier", id: window.location.hostname },
        user: {
          id: new Uint8Array(16),
          name: userInformations.value.mail,
          displayName: [
            userInformations.value.firstname,
            userInformations.value.lastname,
          ].join(" "),
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        timeout: 60000,
        authenticatorSelection: {
          residentKey: "preferred",
          requireResidentKey: false,
          userVerification: "preferred",
        },
        attestation: "none",
        extensions: { credProps: true },
      },
    })
    .then((credentials) => {
      let credentialsToSave = {
        rawId: credentials.rawId,
        id: credentials.id,
      };
      appStore.saveUserCredentials(credentialsToSave);
    });
};

const unsecurize = () => {
  appStore.removeUserCredentials();
};

onMounted(() => {
  userInformations.value.firstname = settings.userInformations?.firstname;
  userInformations.value.lastname = settings.userInformations?.lastname;
  userInformations.value.mail = settings.userInformations?.mail;
});
</script>
