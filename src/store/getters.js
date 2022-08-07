export const getters = {
  searchResults: (state) => {
    //Display only results with images
    if (Object.keys(state.searchResults).length !== 0)
      return state.searchResults.filter((movie) => movie.Poster !== "N/A");
    return [];
  },
  favoriteMovies: (state) => {
    return state.favoriteMovies;
  },
  omdbResults: (state) => {
    return state.omdbResults;
  },
  loading: (state) => {
    return state.loading;
  },
};
