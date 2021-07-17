import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from "../views/Home"
import Popular from "../views/Popular"
import DiscoverMovie from "../views/DiscoverMovie"
Vue.use(VueRouter)
const routes = [
    { path: '/', component: Home },
    { path: '/discover-movie', component: DiscoverMovie, name: 'discoverMovie', },
    { path: '/popular', component: Popular, name: 'popular', }
]
const router = new VueRouter({
    routes
})


export default router