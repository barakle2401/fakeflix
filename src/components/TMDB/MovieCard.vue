<template>
  <v-card>
    <v-img
      contain
      :src="poster(movie.poster_path)"
      class="white--text align-end"
      gradient="to bottom,  rgba(0,0,0,0.5),  rgba(255,44,31,0.1), rgba(0,0,0,0.5)"
    >
      <div class="opacity">
        <v-card-subtitle
          class="text-truncate text-left"
          v-text="movie.original_title"
        ></v-card-subtitle>
        <v-card-subtitle class="text-truncate text-left"
          >Release: {{ formatDate(movie.release_date) }}</v-card-subtitle
        >
        <Rating :rating="movie.vote_average"></Rating>
      </div>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon x-small @click="discover(movie)">
        <v-icon>mdi-information-outline </v-icon>
      </v-btn>
      <v-btn
        :color="isMovieInFavorites ? 'pink' : ''"
        icon
        x-small
        @click="toggleFavorite(movie)"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon x-small>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { IMG_API } from "@/common/constants";
import { formatDate as _formatDate } from "@/utils/utils";
import Rating from "@/shared/Rating";

export default {
  name: "MovieCard",
  components: {
    Rating,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
    displayDelay: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    favoriteMovies() {
      return this.$store.getters.favoriteMovies;
    },
    isMovieInFavorites() {
      return this.favoriteMovies.find((movie) => movie.id === this.movie.id);
    },
  },
  methods: {
    poster(path) {
      return `${IMG_API}/${path}`;
    },
    formatDate(date) {
      return _formatDate(date);
    },
    discover(movie) {
      this.$store.dispatch("discoverTmdbMovie", movie);
    },
    toggleFavorite(movie) {
      if (!this.isMovieInFavorites) {
        this.addToFavorites(movie);
      } else {
        this.removeFromFavorites(movie);
      }
    },
    addToFavorites(movie) {
      this.$store.dispatch("addToFavorites", movie);
    },
    removeFromFavorites(movie) {
      this.$store.dispatch("removeFromFavorites", movie);
    },
  },
};
</script>

<style scoped></style>
