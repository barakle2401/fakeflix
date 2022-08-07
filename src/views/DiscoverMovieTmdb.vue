<template>
  <v-row class="justify-center text-left">
    <v-col cols="12" sm="8" md="6">
      <v-banner class="mt-12" elevation="5">
        <p class="text-h6 font-weight-light">{{ movie.title }}</p>
        <v-row>
          <v-col cols="6">
            <v-img
              :lazy-src="poster(movie.backdrop_path)"
              max-height="300"
              max-width="500"
              :src="poster(movie.poster_path)"
            ></v-img>
          </v-col>
          <v-col cols="6">
            <v-card-subtitle>{{ movie.description }}</v-card-subtitle>
          </v-col>
        </v-row>
      </v-banner>
    </v-col>
  </v-row>
</template>

<script>
import { IMG_API } from "../common/constants";
export default {
  name: "discoverMovieTmdb",

  computed: {
    movie() {
      return this.$store.state.discoverTmdbMovieData;
    },
  },
  methods: {
    poster(path) {
      return `${IMG_API}/${path}`;
    },
  },
};
</script>
<style></style>
