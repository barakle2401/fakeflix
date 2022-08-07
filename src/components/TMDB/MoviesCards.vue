<template>
  <v-row>
    <v-col
      v-for="(movie, i) in movies"
      :key="movie.id"
      transition="scale-transition"
      md="2"
      sm="3"
      cols="6"
    >
      <MovieCard :display-delay="i * 100" :movie="movie"></MovieCard>
    </v-col>
  </v-row>
</template>
<script>
import MovieCard from "@/components/TMDB/MovieCard";
export default {
  name: "MoviesCards",
  components: {
    MovieCard,
  },
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  methods: {},
};
</script>
<style scoped></style>
