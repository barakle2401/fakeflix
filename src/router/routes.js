const Home = () => import("@/views/Home");
const TopRated = () => import("@/views/Favorites");
const Upcoming = () => import("@/views/Upcoming");
const NowPlaying = () => import("@/views/NowPlaying");
const Popular = () => import("@/views/Popular");
const DiscoverMovieTmdb = () => import("@/views/DiscoverMovieTmdb");
const DiscoverMovie = () => import("@/views/DiscoverMovie");

export const routes = [
  { path: "/", component: Home },
  {
    path: "/discover-movie-omdb:movieId",
    component: DiscoverMovie,
    name: "discoverMovie",
  },
  {
    path: "/discover-movie-tmdb:movieId",
    component: DiscoverMovieTmdb,
    name: "discoverMovieTmdb",
  },
  { path: "/popular", component: Popular, name: "popular" },
  { path: "/now-playing", component: NowPlaying, name: "nowPlaying" },
  { path: "/upcoming", component: Upcoming, name: "upcoming" },
  { path: "/favorites", component: TopRated, name: "favorites" },
];
