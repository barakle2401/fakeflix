import Vue from "vue";
import Vuex from "vuex";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";
import { getters } from "@/store/getters";
import { state } from "@/store/state";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
});
export default store;
