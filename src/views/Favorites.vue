<template>
  <v-container>
    <div
      class="text-h6 text-left text--primary font-weight-light mb-3 rounded pa-1"
    >
      Your favorites movies
    </div>
    <MoviesCards :movies="favoriteMovies"></MoviesCards>
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
export default {
  name: "Favorites",
  components: { MoviesCards },
  data: function () {
    return {
      page: 1,
    };
  },
  computed: {
    favoriteMovies() {
      return this.$store.getters.favoriteMovies;
    },
  },
};
</script>
<style></style>
