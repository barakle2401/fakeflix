<template>
  <div class="d-flex align-center">
    <a aria-label="Netflix" class="logo icon-logoUpdate text-primary"
      >FAKEFLIX</a
    >
    <v-toolbar dense flat class="pt-3">
      <v-switch v-model="$vuetify.theme.dark" inset persistent-hint></v-switch>
      <Login></Login>
    </v-toolbar>
    <div
      v-if="user"
      class="pa-5 d-flex flex-column justify-center align-center"
    >
      <v-menu open-delay="200" offset-y>
        <template #activator="{ on, attrs }">
          <v-avatar v-bind="attrs" size="36px" v-on="on" @click="toggleLogOut">
            <img alt="Avatar" :src="userAvatar" />
          </v-avatar>
        </template>
        <v-list class="gray">
          <v-list-item>
            <v-list-item-title>
              <v-btn
                id="logOutBtn"
                class="primary"
                text
                depressed
                x-small
                @click="logout"
              >
                Sign Out
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
<script>
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
      this.$store.dispatch("logOut");
    },
  },
};
</script>
<style scoped>
.theme--dark.v-toolbar.v-sheet {
  background-color: transparent !important;
}

.logo {
  cursor: pointer;
  font-size: 1.8em !important;
  margin-left: 10px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 0.5px;
}
</style>
