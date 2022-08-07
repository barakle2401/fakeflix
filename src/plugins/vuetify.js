import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#ff2c1f",
      },
      dark: {
        primary: "#ff2c1f",
        netflix: "#ff2c1f",
      },
    },
  },
};

export default new Vuetify(opts);
