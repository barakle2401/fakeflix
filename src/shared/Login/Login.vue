<template>
  <v-row>
    <v-dialog v-model="dialog" width="220">
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="primary"
        @click="googleAuth"
      >
        <v-icon dark class="me-auto"> mdi-google </v-icon> sign with google
      </v-btn>
    </v-dialog>
  </v-row>
</template>
<script>
import { getAuth } from "firebase/auth";

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
        this.$store.commit("SET_LOGIN_DIALOG_MODE", newVal);
      },
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit(
          "SET_SNACKBAR_MESSAGE",
          `Logged in as ${user.displayName}`
        );
        this.$store.commit("SET_USER", user);
      }
    });
  },
  methods: {
    googleAuth() {
      this.$store.dispatch("login");
    },
  },
};
</script>
<style></style>
