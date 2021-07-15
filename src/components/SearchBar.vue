<template>
  <v-container id="searchBarWrapper">
    <v-row class="justify-center align-center p-0">
      <v-col cols="12" sm="8" md="6">
        <v-expand-transition>
          <v-autocomplete
            :search-input.sync="searchValue"
            v-model="selectedMovie"
            @keyup="handleSubmit"
            label="Search"
            placeholder="Enter a movie"
            :loading="loading"
            :items="items"
            return-object
            item-text="Title"
            class="search-input"
          ></v-autocomplete>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { OMDB_API_KEY } from "../common/constants";

  import axios from "axios";
  export default {
    name: "SearchBar",
    data() {
      return {
        searchValue: null,
        loading: false,
        items: [],
        search: null,
        selectedMovie: null,
      };
    },
    computed: {},
    watch: {
      searchValue(val) {
        this.loading = true;
        const moviesUrl = axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${val}&page=undefined&type=movie&y=All`
        );
        const seriesUrl = axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${val}&page=undefined&type=series&y=All`
        );
        const gamesUrl = axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${val}&page=undefined&type=game&y=All`
        );

        axios
          .all([moviesUrl, seriesUrl, gamesUrl])
          .then(
            axios.spread((...responses) => {
              responses.forEach((res) => {
                if (res.data.Response === "True") {
                  this.items = this.items.concat(res.data.Search);
                }
              });
            })
          )
          .catch((errors) => {
            console.log(errors);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      selectedMovie(val) {
        if (val.length === 0) return;
        this.$store.commit("setDiscoverMovieData", val);
        this.$router.push("discover-movie");
      },
    },

    methods: {
      handleSubmit(e) {
        if (e.keyCode === 13) {
          console.log(this.selectedMovie);

          if (this.selectedMovie.length === 0) return;
          this.$store.dispatch("discoverMovie", this.selectedMovie);
        }
      },
    },
  };
</script>
<style>
  #searchBarWrapper {
    /* margin-top: 10vh; */
    background-color: transparent;
    display: flex;
    display: flex;
    align-items: center;
  }
  .v-input__slot {
    /* background-color: #ffffff !important; */

    /* font-size: 1.2rem !important; */
  }
</style>
