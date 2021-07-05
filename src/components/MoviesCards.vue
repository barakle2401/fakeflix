<template>
  <v-row class="justify-center">
    <MovieCard
      v-for="(item, i) in searchResults"
      :data="item"
      :key="i"
    ></MovieCard>
  </v-row>
</template>
<script>
  import MovieCard from "./MovieCard.vue";
  export default {
    name: "Cards",

    components: {
      MovieCard,
    },
    computed: {
      searchResults() {
        return this.$store.getters.searchResults;
      },
    },
  };
</script>
<style scoped></style>
