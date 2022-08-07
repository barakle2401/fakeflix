<template>
  <v-container id="searchBarWrapper">
    <v-row class="justify-center align-center p-0">
      <v-col cols="12" sm="8" md="6">
        <v-scale-transition>
          <v-text-field
            v-model="searchValue"
            label="Search"
            placeholder="Search for a movie, series, or a game"
            :loading="loading"
            item-text="Title"
            class="search-input"
            solo-inverted
            @keyup.delete="showAlert = false"
          ></v-text-field>
        </v-scale-transition>
      </v-col>
    </v-row>
    <v-row class="justify-center text-left font-weight-bolder">
      <v-col cols="12" sm="6" md="4">
        <v-fab-transition>
          <v-alert
            v-show="showAlert && searchValue.length > 2"
            text
            prominent
            type="error"
            class="align-center"
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
import { OMDB_API_KEY } from "@/common/constants";
import { debounce } from "@/utils/utils";
export default {
  name: "SearchBar",
  data() {
    return {
      searchValue: "",
      loading: false,
      showAlert: false,
      search: null,
      selectedMovie: "",
      cancelToken: null,
    };
  },
  watch: {
    searchValue(searchVal) {
      this.showAlert = false;
      if (searchVal.length < 2) return;

      this.fetchData(searchVal);
    },
  },
  mounted() {
    this.cancelToken = this.$axios.CancelToken;
  },
  methods: {
    fetchData: debounce(function (searchVal) {
      this.loading = true;
      const source = this.cancelToken.source();
      const urls = this.getUrls(searchVal);

      this.$axios
        .all(urls, {
          cancelToken: source.token,
        })
        .then(
          this.$axios.spread((...responses) => {
            this.handleResponses(responses);
          })
        )
        .finally(() => {
          this.loading = false;
        });
    }, 500),
    getUrls(searchVal) {
      const moviesUrl = this.$axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchVal}&type=movie&y=All`
      );
      const seriesUrl = this.$axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchVal}&type=series&y=All`
      );
      const gamesUrl = this.$axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchVal}&type=game&y=All`
      );
      return [moviesUrl, seriesUrl, gamesUrl];
    },
    handleResponses(responses) {
      const results = responses
        .map((res) => {
          if (res.data.Response === "True") {
            return res.data.Search;
          }
        })
        .filter((subArr) => Array.isArray(subArr))
        .flat();

      setTimeout(() => {
        this.showAlert = results.length === 0;
      }, 500);

      this.$store.commit("SET_OMDB_SEARCH_RESULTS", results);
    },
  },
};
</script>
<style></style>
