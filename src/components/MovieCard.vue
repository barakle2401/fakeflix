<template>
  <v-card class="mx-auto my-12 movie-card rounded" min-height="400">
    <v-img height="350" contain :src="poster"></v-img>

    <v-card-subtitle class="px-3 pb-1 text-truncate text-left">{{
      data.Title
    }}</v-card-subtitle>
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
        router.push({
          name: "discoverMovie",
          params: { id: this.data.imdbID },
        });
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
