<template>
  <v-container id="searchBarWrapper">
    <v-row class="justify-center align-center p-0">
      <v-col cols="12" sm="8" md="6">
        <v-scale-transition>
          <v-text-field
            v-show="showSearchInput"
            v-model="searchValue"
            label="Search"
            placeholder="Search for a movie, series, or a game"
            :loading="loading"
            item-text="Title"
            class="search-input"
            solo-inverted
          ></v-text-field>
        </v-scale-transition>
      </v-col>
    </v-row>
    <v-row class="justify-center text-left font-weight-bolder">
      <v-col cols="12" sm="6" md="4">
        <v-fab-transition>
          <v-alert
            v-show="showAlert && searchValue.length > 0"
            text
            prominent
            type="error"
            icon="mdi-cloud-alert"
            dense
          >
            <p class="text-h7">No matches were found for {{ searchValue }}</p>
          </v-alert>
        </v-fab-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { OMDB_API_KEY } from "../common/constants";
  import { debounce } from "../common/functions";
  // import axios from "axios";
  export default {
    name: "SearchBar",
    data() {
      return {
        searchValue: null,
        loading: false,
        showSearchInput: false,
        showAlert: false,
        search: null,
        selectedMovie: "",
      };
    },
    computed: {
      items: {
        get() {
          return this.$store.getters.searchResults;
        },
        set(newVal) {
          this.$store.commit("setSearchResults", newVal);
        },
      },
    },
    mounted() {
      setTimeout(() => {
        this.showSearchInput = true;
      }, 500);
    },
    watch: {
      searchValue: debounce(function(val) {
        this.loading = true;
        this.showAlert = false;
        const moviesUrl = this.$axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${val}&page=undefined&type=movie&y=All`
        );
        const seriesUrl = this.$axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${val}&page=undefined&type=series&y=All`
        );
        const gamesUrl = this.$axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${val}&page=undefined&type=game&y=All`
        );

        this.$axios
          .all([moviesUrl, seriesUrl, gamesUrl])
          .then(
            this.$axios.spread((...responses) => {
              this.items = [];
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
            this.items.length === 0
              ? (this.showAlert = true)
              : (this.showAlert = false);
          });
      }, 350),
    },

    methods: {},
  };
</script>
<style></style>
