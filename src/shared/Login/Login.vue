<template>
  <v-row justify="center">
    <section id="firebaseui-auth-container"></section>
  </v-row>
</template>
<script>
  import firebase from "firebase/app";
  import * as firebaseui from "firebaseui";
  import "firebaseui/dist/firebaseui.css";
  export default {
    name: "Login",
    data: () => {
      return {
        dialog: false,
      };
    },
    mounted() {
      console.log(firebaseui);
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      const uiConfig = {
        signInSuccessUrl: "/profile",
        signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    },
  };
</script>
<style></style>
