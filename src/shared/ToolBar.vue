<template>
  <div class="d-flex align-center">
    <img width="100" src="../assets/images/fakeflix4.png" alt="" srcset="" />
    <v-toolbar dense flat>
      <v-switch v-model="$vuetify.theme.dark" inset persistent-hint></v-switch>
      <Login></Login>
    </v-toolbar>
    <div
      v-if="user"
      class="pa-5 d-flex flex-column justify-center align-center"
    >
      <v-avatar size="36px" @click="toggleLogOut">
        <img alt="Avatar" :src="userAvatar" />
      </v-avatar>
      <div transition="fab-transition">
        <v-btn @click="logout" v-show="showLogOut" depressed rounded text small>
          Logout
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
  import firebase from "firebase";
  import Login from "./Login/Login.vue";
  export default {
    name: "ToolBar",
    components: {
      Login,
    },
    data: () => {
      return {
        showLogOut: false,
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      userAvatar() {
        return this.user.photoURL;
      },
    },
    methods: {
      toggleLogOut() {
        this.showLogOut = !this.showLogOut;
      },
      logout() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            // Sign-out successful.

            this.$store.dispatch("logOut");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      },
    },
  };
</script>
<style>
  .theme--dark.v-toolbar.v-sheet {
    background-color: transparent !important;
  }
</style>
