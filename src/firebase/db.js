import { db } from "./firebase";
import { ref, set, child, get } from "firebase/database";
import firebase from "firebase/compat/app";

const addToFavorites = async (movie, user) => {
  return new Promise((resolve, reject) => {
    set(ref(db, `favorites/${user.uid}/${movie.id}`), {
      ...movie,
    })
      .then(() => {
        resolve("OK");
      })
      .catch(() => {
        reject();
      });
  });
};

const removeFromFavorites = async (movie, user) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`favorites/${user.uid}/${movie.id}`)
      .remove()
      .then(() => {
        resolve("OK");
      })
      .catch(() => {
        reject();
      });
  });
};

const getFavorites = async (user) => {
  const dbRef = ref(db);
  return new Promise((resolve, reject) => {
    get(child(dbRef, `favorites/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject("No data available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  addToFavorites: addToFavorites,
  getFavorites: getFavorites,
  removeFromFavorites: removeFromFavorites,
};
