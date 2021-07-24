import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from "./router/router"
import store from "./modules/store"
import axios from "axios"
import firebase from "firebase/app"
import firebaseConfig from "./common/config"
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
//register global filters
Vue.filter('capitalize', function (value) {

  if (!value) return;
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);

})

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  setTimeout(() => {
    store.commit('setLoading', false)

    next()
  }, 1000)

})
new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
