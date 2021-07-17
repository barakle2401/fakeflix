<template>
  <v-container>
    <div
      class="text-h6 text-left  text--primary font-weight-light mb-3  rounded pa-1 "
    >
      The most popular movies
    </div>
    <v-row>
      <v-col md="2" sm="3" cols="6" v-for="movie in movies" :key="movie.id">
        <v-card>
          <v-img
            transition="scale-transition"
            v-show="show"
            contain
            :src="poster(movie.poster_path)"
            class="white--text align-end"
            gradient="to bottom,  rgba(0,0,0,0.5),  rgba(255,44,31,0.1), rgba(0,0,0,0.5)"
          >
            <v-card-subtitle
              class="text-truncate text-left"
              v-text="movie.original_title"
            ></v-card-subtitle>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon x-small @click="addToFavorites(movie.id)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon x-small>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col md="4">
        <div class="text-center">
          <v-pagination v-model="page" :length="4" circle></v-pagination></div
      ></v-col>
    </v-row>
  </v-container>
</template>
<script>
  import axios from "axios";
  const IMG_API = "https://image.tmdb.org/t/p/w1280";
  import { TMDB_API_KEY } from "../common/constants";
  export default {
    name: "Popular",
    data: function() {
      return {
        movies: [],
        page: 1,
        show: false,
      };
    },
    created() {
      this.getPopularMovies();
    },
    watch: {
      page() {
        this.getPopularMovies();
      },
    },
    methods: {
      getPopularMovies() {
        this.$store.commit("setLoading", true);
        this.show = false;
        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}&page=${this.page}`
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.movies = res.data.results;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit("setLoading", false);
            this.show = true;
          });
      },
      poster(path) {
        return `${IMG_API}/${path}`;
      },
      addToFavorites(movieId) {
        console.log(movieId);
      },
    },
  };
</script>
<style></style>
