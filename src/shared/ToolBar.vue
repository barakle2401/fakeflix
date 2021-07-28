<template>
  <div class="d-flex align-center">
    <img width="100" src="../assets/images/fakeflix4.png" alt="" srcset="" />
    <v-toolbar dense flat>
      <v-switch v-model="$vuetify.theme.dark" inset persistent-hint></v-switch>
      <Login></Login>
    </v-toolbar>
  </div>
</template>
<script>
  import Login from "./Login/Login.vue";
  export default {
    name: "ToolBar",
    components: {
      Login,
    },
  };
</script>
<style>
  .theme--dark.v-toolbar.v-sheet {
    background-color: transparent !important;
  }
</style>
