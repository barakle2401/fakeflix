<template>
  <v-row class="justify-start">
    <v-col
      v-for="(item, i) in searchResults"
      :key="i"
      xl="2"
      sm="3"
      xs="4"
      cols="6"
    >
      <MovieCard :display-delay="i * 100" :data="item"></MovieCard>
    </v-col>
  </v-row>
</template>
<script>
import MovieCard from "@/components/OMDB/MovieCard";
export default {
  name: "Cards",
  components: {
    MovieCard,
  },
  computed: {
    searchResults() {
      return this.$store.getters.omdbResults;
    },
  },
};
</script>
<style scoped></style>
