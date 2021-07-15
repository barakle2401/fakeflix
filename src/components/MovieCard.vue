<template>
  <v-col cols="6" md="3">
    <v-card class="mx-auto my-12 movie-card rounded-0" max-width="374">
      <v-img height="350" :src="poster"></v-img>

      <v-card-title class="px-3 pb-1">{{ data.Title }}</v-card-title>
      <div class="d-flex ">
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
  </v-col>
</template>
<script>
  import router from "../router/router";
  export default {
    name: "MovieCard",
    props: ["data"],
    data() {
      return {
        loading: false,
        selection: 1,
      };
    },
    methods: {
      discoverMovie() {
        this.loading = true;
        this.$store.commit("resetDiscoverMovie");
        router.push({
          name: "discoverMovie",
          params: { id: this.data.imdbID },
        });
        this.loading = false;
      },
    },
    computed: {
      poster() {
        return this.data.Poster;
      },
    },
    created() {},
  };
</script>
<style scoped>
  .movie-card {
    background-color: rgba(65, 57, 57, 0) !important;
    color: rgb(255, 255, 255);
  }
</style>
