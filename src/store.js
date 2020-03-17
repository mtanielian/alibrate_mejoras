import Vue from 'vue'
import Vuex from 'vuex'
const jwtDecode = require('jwt-decode')
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Store = new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage  })],
    state : {
        token: false,
        data_user : ""
    },
    
    mutations : {
        setToken(state, token) {
            state.token = token
            state.data_user = jwtDecode(token)
        },
        logout(state) {
            state.token = false,
            state.data_user = ""
        }
    },
    
    actions : {
        setToken({ commit }, token) {
            commit('setToken', token);
        },
        logoutUser({ commit }) {
            commit('logout');
        }
    },
    
    getters : {

    }
    











})




export default Store;