<template>
  <Card
    noFooter
    title="Authentification"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="flex gap-4">
          <span
            v-if="userInformations.firstname.length === 0"
            class="mi text-red-600"
            >error</span
          >
          <span
            v-else
            class="mi text-green-600"
            >check_circle
          </span>
          <div>Prénom : {{ userInformations.firstname }}</div>
        </div>
        <div class="flex gap-4">
          <span
            v-if="userInformations.lastname.length === 0"
            class="mi text-red-600"
            >error</span
          >
          <span
            v-else
            class="mi text-green-600"
            >check_circle</span
          >
          <div>Nom : {{ userInformations.lastname }}</div>
        </div>
        <div class="flex gap-4">
          <span
            v-if="userInformations.mail.length === 0"
            class="mi text-red-600"
            >error</span
          >
          <span
            v-else
            class="mi text-green-600"
            >check_circle</span
          >
          <div>Mail : {{ userInformations.mail }}</div>
        </div>
      </div>
      <div
        v-if="!hasInformationsDefined"
        class="text-justify"
      >
        <Message severity="info">
          Pour sécuriser votre compte, vous devez d'abord ajouter des
          informations de sécurité qui nous permettrons de vous authentifier.
        </Message>
      </div>
      <Btn
        @click="register"
        icon="person_edit"
        >Modifier les informations</Btn
      >
      <Btn
        v-if="!appStore.userCredentials"
        @click="securize"
        :disabled="!hasInformationsDefined"
        icon="fingerprint"
      >
        Sécuriser le compte
      </Btn>
      <Btn
        v-else
        severity="error"
        @click="unsecurize"
        icon="encrypted_off"
        >Retirer la sécurité</Btn
      >
    </div>
  </Card>

  <Dialog
    v-model:opened="authDialogOpened"
    @confirm="onConfirm"
  >
    <div class="flex flex-col gap-4">
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
import useSettingsStore from "@/plugins/stores/Settings";
import useAppStore from "@/plugins/stores/App";
import useToastStore from "@/plugins/stores/Toast";
import { generateRandomChallenge } from "@/utils/Security";

const appStore = useAppStore();
const settings = useSettingsStore();
const toast = useToastStore();

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

const hasInformationsDefined = computed(
  () =>
    userInformations.value.firstname.length > 0 &&
    userInformations.value.lastname.length > 0 &&
    userInformations.value.mail.length > 0,
);

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
  toast.push("Enregistré !");
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
        attestationObject: credentials.response.attestationObject,
        clientDataJSON: credentials.response.clientDataJSON,
      };
      appStore.saveUserCredentials(credentialsToSave);
      toast.push("Ton compte est maintenant sécurisé !");
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
