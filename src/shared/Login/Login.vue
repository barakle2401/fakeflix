<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          In order to save movies, pleas login with facebook.
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="facebookAuth">
            FACEBOOK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import firebase from "firebase";
  // import * as firebaseui from "firebaseui";
  import "firebaseui/dist/firebaseui.css";
  export default {
    name: "Login",
    data: () => {
      return {};
    },
    computed: {
      dialog: {
        get() {
          return this.$store.state.loginDialogMode;
        },
        set(newVal) {
          this.$store.commit("setLoginDialogMode", newVal);
        },
      },
    },
    methods: {
      facebookAuth() {
        // let ui = firebaseui.auth.AuthUI.getInstance();
        // if (!ui) {
        //   ui = new firebaseui.auth.AuthUI(firebase.auth());
        // }
        // const uiConfig = {
        //   signInSuccessUrl: "/",
        //   signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
        // };
        // ui.start("#firebaseui-auth-container", uiConfig);
        console.log(firebase);
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({
          display: "popup",
        });
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            this.$store.commit("setLoginDialogMode", false);
            console.log(result.user);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },

    created() {
      // console.log(firebase);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit("setSnackBar", `Logged in as ${user.displayName}`);
          this.$store.commit("setUser", user);
        }
      });
    },
  };
</script>
<style></style>
