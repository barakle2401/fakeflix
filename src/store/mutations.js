import * as types from "./mutation-types";
export const mutations = {
  [types.SET_SNACKBAR_MESSAGE](state, message) {
    state.snackbar = { on: true, message };
    setTimeout(() => {
      state.snackbar = { on: false, message: "" };
    }, 3500);
  },
  [types.SET_LOADING](state, payload) {
    state.loading = payload;
  },
  [types.SET_OMDB_SEARCH_RESULTS](state, results) {
    state.omdbResults = results;
  },
  [types.SET_LOGIN_DIALOG_MODE](state, mode) {
    state.loginDialogMode = mode;
  },
  [types.SET_FAVORITES](state, favorites) {
    state.favoriteMovies = favorites;
  },
  [types.SET_USER](state, user) {
    state.user = user;
  },
};
