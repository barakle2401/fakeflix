<template>
  <v-container id="searchBarWrapper">
    <v-row class="justify-center align-center p-0">
      <v-col cols="12" sm="8" md="6">
        <v-expand-transition>
          <v-text-field
            v-model="searchValue"
            @keyup="handleSubmit"
            label="Search"
            placeholder="Enter a movie"
            filled
            rounded
            dense
            class="search-input"
          ></v-text-field>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: "SearchBar",
    data() {
      return {};
    },
    computed: {
      searchValue: {
        get() {
          return this.$store.state.searchValue;
        },
        set(newVal) {
          this.$store.dispatch("setSearchValue", newVal);
        },
      },
    },

    methods: {
      handleSubmit(e) {
        if (e.keyCode === 13) {
          const searchValue = this.searchValue;
          if (searchValue.length === 0) return;
          this.$store.dispatch("submitSearch", searchValue);
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
