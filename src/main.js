import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import router from "./router/router";
import axios from "axios";
import "./firebase";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
//register global filters
Vue.filter("capitalize", function (value) {
  if (!value) return;
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
