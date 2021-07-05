<template>
  <div>
    <Title></Title>
    <SearchBar> </SearchBar>

    <v-container v-if="dataFetched">
      <transition name="slide-fade"> </transition>
      <Cards> </Cards>
    </v-container>
  </div>
</template>
<script>
  import SearchBar from "../components/SearchBar.vue";
  import Title from "../components/Title.vue";
  import Cards from "../components/MoviesCards.vue";

  export default {
    name: "Home",
    components: {
      Title,
      SearchBar,
      Cards,
    },
    computed: {
      dataFetched() {
        return this.$store.state.dataFetched;
      },
    },
  };
</script>
<style></style>
