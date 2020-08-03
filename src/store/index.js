import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: '',
    businesses: [],
    filteredBusinesses: [],
    totalBusinesses: 0,
    allCategories: [],
    parentCategories: [],
    category: ''
  },
  mutations: {
    setLocation (state, payload) {
      state.location = payload.value
    },
    setBusinesses (state, payload) {
      state.businesses = payload.value
    },
    setFilteredBusinesses (state, payload) {
      state.filteredBusinesses = payload.value
    },
    setTotalBusinesses (state, payload) {
      state.totalBusinesses = payload.value
    },
    setAllCategories (state, payload) {
      state.allCategories = payload.value
    },
    setParentCategories (state, payload) {
      state.parentCategories = payload.value
    },
    setCategory (state, payload) {
      state.category = payload.value
    }
  },
  actions: {
  },
  modules: {
  }
})
