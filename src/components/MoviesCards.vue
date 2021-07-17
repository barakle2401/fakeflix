<template>
  <v-row class="justify-start">
    <v-col
      xl="2"
      sm="3"
      xs="4"
      cols="6"
      v-for="(item, i) in searchResults"
      :key="i"
    >
      <MovieCard :data="item"></MovieCard>
    </v-col>
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
