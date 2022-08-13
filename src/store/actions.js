import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import db from "@/firebase/db";

const provider = new GoogleAuthProvider();

export const actions = {
  logOut({ commit }) {
    commit("SET_LOADING", true);

    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });
        promise.then(() => {
          commit("SET_SNACKBAR_MESSAGE", "Sign out successful.");
          commit("SET_LOADING", false);
          commit("SET_USER", null);
          commit("SET_FAVORITES", []);
        });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  },
  login({ commit, dispatch }) {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        commit("SET_USER", user);
        commit("SET_SNACKBAR_MESSAGE", `Logged in as ${user.displayName}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        commit("SET_SNACKBAR_MESSAGE", `${errorCode} :${errorMessage}`);
      })
      .finally(() => {
        commit("SET_LOADING", false);
        commit("SET_LOGIN_DIALOG_MODE", false);
        dispatch("getFavoriteMovies");
      });
  },
  addToFavorites({ commit, state }, movie) {
    if (!state.user) {
      commit("SET_LOGIN_DIALOG_MODE", true);
    } else {
      db.addToFavorites(movie, state.user).then((res) => {
        if (res === "OK") {
          commit("SET_SNACKBAR_MESSAGE", `${movie.title} added to favorites.`);
          const updatedFavorites = [...state.favoriteMovies];
          updatedFavorites.push(movie);
          commit("SET_FAVORITES", updatedFavorites);
        }
      });
    }
  },
  removeFromFavorites({ commit, state }, movie) {
    if (!state.user) {
      commit("SET_LOGIN_DIALOG_MODE", true);
    } else {
      db.removeFromFavorites(movie, state.user).then((res) => {
        if (res === "OK") {
          commit(
            "SET_SNACKBAR_MESSAGE",
            `${movie.title} removed from favorites.`
          );
          //TODO: refactor removal
          const updatedFavorites = [...state.favoriteMovies].filter(
            (m) => m.id !== movie.id
          );
          commit("SET_FAVORITES", updatedFavorites);
        }
      });
    }
  },
  async getFavoriteMovies({ commit, state }) {
    commit("SET_LOADING", true);
    try {
      const favorites = (await db.getFavorites(state.user)) || [];
      const inArray = Object.keys(favorites).map((movieId) => {
        return favorites[movieId];
      });
      commit("SET_FAVORITES", inArray);
    } catch (e) {
      console.log(e);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};
