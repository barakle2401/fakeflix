<template>
  <v-fab-transition>
    <v-card
      v-show="showCard"
      class="mx-auto mb-6 movie-card rounded"
      min-height="400"
    >
      <v-img height="350" contain :src="poster"></v-img>

      <v-card-subtitle class="px-3 pb-1 text-truncate text-left">{{
        title
      }}</v-card-subtitle>
      <div class="d-flex">
        <v-subheader class="grey--text"
          >Type: {{ data.Type | capitalize }}</v-subheader
        >
        <v-divider vertical></v-divider>
        <v-subheader class="grey--text">Release: {{ data.Year }}</v-subheader>
      </div>

      <v-card-actions>
        <v-btn
          :loading="loading"
          class="ma-1 font-weight-bold"
          color="netflix"
          plain
          @click="discoverMovie"
        >
          Discover
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-fab-transition>
</template>
<script>
export default {
  name: "MovieCard",
  props: {
    data: {
      type: Object,
      required: true,
    },
    displayDelay: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      loading: false,
      showCard: false,
      selection: 1,
    };
  },
  computed: {
    poster() {
      return this.data.Poster;
    },
    title() {
      return this.data.title;
    },
  },
  mounted() {
    setTimeout(() => {
      this.showCard = true;
    }, this.displayDelay);
  },
  methods: {
    discoverMovie() {
      this.$router.push({
        name: "discoverMovie",
        params: { movieId: this.data.imdbID },
      });
    },
  },
};
</script>
<style scoped>
.movie-card {
  background-color: rgba(65, 57, 57, 0) !important;
  color: rgb(255, 255, 255);
}
</style>
