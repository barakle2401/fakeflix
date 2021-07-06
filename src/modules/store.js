
import Vue from 'vue'
import Vuex from 'vuex'
import { OMDB_API_KEY } from "../common/constants"
import axios from 'axios'
import router from '../router/router'

Vue.use(Vuex)
const store = new Vuex.Store({

    state: {
        searchValue: 'Batman',
        searchResults: {},
        discoverMovieData: {},
        loading: false,
        dataFetched: false
    },
    mutations: {
        setSearchValue(state, value) {
            state.searchValue = value
        },
        setData(state, results) {
            state.searchResults = results;

        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setDataFetched(state, payload) {
            state.dataFetched = payload
        },
        setDiscoverMovieData(state, payload) {
            state.discoverMovieData = payload;
        }, resetDiscoverMovie(state) {
            state.discoverMovieData = {};
        }
    },
    actions: {

        setSearchValue({ commit }, value) {

            commit('setSearchValue', value)
        },
        submitSearch({ commit }, value) {
            commit('setLoading', true)
            setTimeout(() => {

                axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${value}&plot=full`)
                    .then(res => res.data)
                    .then(res => {
                        if (res.Response === 'False') {
                            alert(res.Error)
                        } else {
                            commit('setData', res.Search)
                            commit('setDataFetched', true)

                        }
                        commit('setLoading', false)
                    })
                    .catch(({ message }) => {
                        console.log(message);
                    })

            }, 1500)
        },
        discoverMovie({ commit }, id) {

            commit('setLoading', true)
            axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`)
                .then(res => {

                    if (res.data.Response === 'True') {
                        commit('setDiscoverMovieData', res.data)
                    } else {
                        alert('Something went wrong')
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
            return {}

        }
    }

})
export default store