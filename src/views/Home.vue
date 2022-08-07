<template>
  <div>
    <OmdbSearchBar> </OmdbSearchBar>
    <v-container>
      <transition name="slide-fade"> </transition>
      <MoviesCards> </MoviesCards>
    </v-container>
  </div>
</template>
<script>
import OmdbSearchBar from "@/components/OMDB/OmdbSearchBar.vue";

import MoviesCards from "@/components/OMDB/MoviesCards.vue";

export default {
  name: "Home",
  components: {
    OmdbSearchBar,
    MoviesCards,
  },
  computed: {},
};
</script>
<style></style>
