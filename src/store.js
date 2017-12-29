import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userName:''
    },
    mutations: {
        login: (state, data) => {
            state.userName = data.userName
        },
        logout: (state) => {
            state.userName = ''
        }
    }
})
