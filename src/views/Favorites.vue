<template>
  <v-container>
    <div v-if="movies.length > 0">
      <div
        class="text-h6 text-left text--primary font-weight-light mb-3 rounded pa-1"
      >
        Your favorites movies
      </div>

      <MoviesCards :movies="movies"></MoviesCards>
    </div>

    <WarningMessage
      v-else-if="!$store.state.loading"
      message="No favorites movies yet"
    ></WarningMessage>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Favorites",
  components: {
    MoviesCards: () => import("@/components/TMDB/MoviesCards"),
    WarningMessage: () => import("@/shared/WarningMessage"),
  },
  data: function () {
    return {
      page: 1,
    };
  },
  computed: {
    movies() {
      return this.$store.getters.favoriteMovies;
    },
    ...mapGetters(["user"]),
  },
  created() {
    if (this.user) {
      this.$store.dispatch("getFavoriteMovies");
    }
  },
};
</script>
<style></style>
