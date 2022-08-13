<template>
  <v-container>
    <v-row class="justify-center text-left" no-gutters>
      <v-col cols="12" sm="8">
        <v-card v-if="movie" class="mt-12" elevation="5">
          <v-card-text>
            <div class="d-flex align-center">
              <div class="d-flex flex-column me-auto">
                <span class="text-h6 font-weight-light">
                  {{ movie.title }}</span
                >
                <span class="text-truncate text-left"
                  >Release: {{ formatDate(movie.release_date) }}
                </span>
                <span class="text-truncate text-left"
                  >Vote average:
                  <span :class="voteClass">{{ movie.vote_average }}</span>
                </span>
              </div>

              <span
                v-for="genre in movie.genres"
                :key="genre.name"
                class="font-weight-light primary mx-2 pa-3 rounded"
                >{{ genre.name }}</span
              >
            </div>

            <v-row class="mt-3">
              <v-col cols="6">
                <v-img
                  :lazy-src="poster(movie.poster_path)"
                  max-height="500"
                  :src="poster(movie.poster_path)"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-card-subtitle>{{ movie.overview }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { IMG_API, TMDB_API_KEY } from "@/common/constants";
import { formatDate as _formatDate } from "@/utils/utils";

import axios from "axios";
export default {
  name: "DiscoverMovieTmdb",
  components: {},
  data: function () {
    return {
      movie: null,
    };
  },
  computed: {
    movieId() {
      return this.$route.params.movieId;
    },
    voteClass() {
      const average = parseFloat(this.movie.vote_average);

      if (average > 7) {
        return "green--text";
      } else if (average > 5) {
        return "yellow--text";
      } else {
        return "red--text";
      }
    },
  },
  created() {
    this.getMovie();
  },
  methods: {
    poster(path) {
      return `${IMG_API}/${path}`;
    },
    formatDate(date) {
      return _formatDate(date);
    },
    getMovie() {
      this.$store.commit("SET_LOADING", true);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${TMDB_API_KEY}`
        )
        .then((res) => {
          if (res.status === 200) {
            this.movie = res.data;
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
<style scoped></style>
