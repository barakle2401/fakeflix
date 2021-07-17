
import Vue from 'vue'
import Vuex from 'vuex'
import { OMDB_API_KEY } from "../common/constants"
import axios from 'axios'
import router from '../router/router'

Vue.use(Vuex)
const store = new Vuex.Store({

    state: {
        searchValue: 'Batman',
        searchResults: [],
        discoverMovieData: {},
        loading: false,

    },
    mutations: {

        setLoading(state, payload) {
            state.loading = payload
        },

        setDiscoverMovieData(state, payload) {
            state.discoverMovieData = payload;
        },
        setSearchResults(state, results) {
            state.searchResults = results
        }
    },
    actions: {

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

        }
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