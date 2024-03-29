import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
  databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
};

const app = firebase.initializeApp(config);

const db = getDatabase(app);

export { db };
