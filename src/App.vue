<template>
  <div id="app">
    <v-app>
      <Loader v-if="appLoading"></Loader>
      <ToolBar></ToolBar>
      <NavBar></NavBar>
      <SnackBar :show="snackbar.on" :message="snackbar.message"></SnackBar>
      <transition>
        <router-view></router-view>
      </transition>
    </v-app>
  </div>
</template>

<script>
import store from "./store/store";
import Loader from "./shared/Loader.vue";
import ToolBar from "./shared/ToolBar.vue";
import NavBar from "./shared/NavBar.vue";
import SnackBar from "./shared/SnackBar.vue";
/*
    Todos next ideas:
     - add rating popup component 
  
  */

export default {
  name: "App",
  store,
  components: { Loader, ToolBar, NavBar, SnackBar },
  computed: {
    appLoading() {
      return store.state.loading;
    },
    snackbar() {
      return this.$store.state.snackbar;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

#app {
  font-family: "Lato", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-size: cover;
  /* background-color: #000000; */
  /* background-image: url("./assets/images/metal.jpg"); */
  background-position: 50%;
  height: 100%;
  width: 100%;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
