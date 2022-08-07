import router from "@/router/router";
import axios from "axios";
import { OMDB_API_KEY } from "@/common/constants";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import db from "@/firebase/db";

const provider = new GoogleAuthProvider();

export const actions = {
  discoverTmdbMovie({ commit }, movie) {
    commit("SET_LOADING", movie);
    router.push("discover-movie-tmdb");
  },
  discoverMovie({ commit }, id) {
    commit("SET_LOADING", true);
    axios
      .get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`)
      .then((res) => {
        if (res.data.Response === "True") {
          commit("SET_DISCOVER_MOVIE_DATA", res.data);
        } else {
          router.go(-1);
        }
        commit("SET_LOADING", false);
      })
      .catch(({ message }) => {
        console.log(message);
      });
  },
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
        });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  },
  login({ commit }) {
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
      });
  },
  addToFavorites({ commit, state }, movie) {
    if (!state.user) {
      commit("SET_LOGIN_DIALOG_MODE", true);
    } else {
      db.addToFavorites(movie).then((res) => {
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
      db.removeFromFavorites(movie).then((res) => {
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
  async getFavoriteMovies({ commit }) {
    const favorites = await db.getFavorites();

    const inArray = Object.keys(favorites).map((movieId) => {
      return favorites[movieId];
    });

    commit("SET_FAVORITES", inArray);
  },
};
