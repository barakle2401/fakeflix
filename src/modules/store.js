
import Vue from 'vue'
import Vuex from 'vuex'
import { OMDB_API_KEY } from "../common/constants"

import router from '../router/router'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({

    state: {
        searchValue: 'Batman',
        searchResults: [],
        discoverMovieData: {},
        discoverTmdbMovieData: {},
        loading: false,
        loginDialogMode: false,
        user: null,
        snackbar: {
            message: '',
            on: false
        }
    },
    mutations: {

        setSnackBar(state, message) {
            state.snackbar = { on: true, message }
            setTimeout(() => {
                state.snackbar = { on: false, message: '' }
            }, 3500)

        },
        setLoading(state, payload) {
            state.loading = payload
        },

        setDiscoverMovieData(state, payload) {
            state.discoverMovieData = payload;
        },
        setSearchResults(state, results) {
            state.searchResults = results
        }
        , setDiscoverTmdbMovie(state, movie) {
            state.discoverTmdbMovieData = movie
        },
        setLoginDialogMode(state, mode) {
            state.loginDialogMode = mode
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        discoverTmdbMovie({ commit }, movie) {

            commit('setDiscoverTmdbMovie', movie)
            router.push('discover-movie-tmdb')

        },
        setSearchValue({ commit }, value) {

            commit('setSearchValue', value)

        },
        discoverMovie({ commit }, id) {
            commit('setLoading', true)
            axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`)
                .then(res => {


                    if (res.data.Response === 'True') {
                        commit('setDiscoverMovieData', res.data)
                    } else {

                        router.go(-1)
                    }
                    commit('setLoading', false)


                })
                .catch(({ message }) => {
                    console.log(message);
                })

        },
        logOut({ commit }) {
            commit('setLoading', true)
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve()

                }, 500)
            })
            promise.then(() => {
                commit('setSnackBar', 'Sign out successful.')
                commit('setLoading', false)
                commit('setUser', null)
            })

        }
        // addToFavorites({commit},movieId){

        // }
    },
    getters: {

        searchResults: state => {
            //display only movies that has an image
            if (Object.keys(state.searchResults).length !== 0)
                return state.searchResults.filter(movie => movie.Poster !== 'N/A')
            return []
        },

    }

})
export default store