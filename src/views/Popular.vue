<template>
  <v-container>
    <div
      class="text-h6 text-left text--primary font-weight-light mb-3 rounded pa-1"
    >
      The most popular movies
    </div>
    <MoviesCards :movies="popularMovies"></MoviesCards>
    <v-row class="justify-center">
      <v-col md="4">
        <div class="text-center">
          <v-pagination v-model="page" :length="4" circle></v-pagination></div
      ></v-col>
    </v-row>
  </v-container>
</template>
<script>
import MoviesCards from "@/components/TMDB/MoviesCards";
import axios from "axios";
import { TMDB_API_KEY } from "@/common/constants";
export default {
  name: "Popular",
  components: {
    MoviesCards,
  },
  data: function () {
    return {
      page: 1,
      popularMovies: [],
    };
  },
  watch: {
    page() {
      this.getPopularMovies();
    },
  },
  created() {
    this.getPopularMovies();
  },
  methods: {
    getPopularMovies() {
      this.$store.commit("SET_LOADING", true);
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}&page=${this.page}`
        )
        .then((res) => {
          if (res.status === 200) {
            this.popularMovies = res.data.results;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    },
  },
};
</script>
<style>
.opacity {
  background-color: #572b293f;
}
</style>
