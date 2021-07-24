import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from "../views/Home"
import Popular from "../views/Popular"
import DiscoverMovie from "../views/DiscoverMovie"
import discoverMovieTmdb from "../views/DiscoverMovieTmdb"
import NowPlaying from "../views/NowPlaying"
Vue.use(VueRouter)
const routes = [
    { path: '/', component: Home },
    { path: '/discover-movie', component: DiscoverMovie, name: 'discoverMovie', },
    { path: '/discover-movie-tmdb', component: discoverMovieTmdb, name: 'discoverMovieTmdb', },
    { path: '/popular', component: Popular, name: 'popular', },
    { path: '/now-playing', component: NowPlaying, name: 'nowPlaying', }
]
const router = new VueRouter({
    routes
})


export default router