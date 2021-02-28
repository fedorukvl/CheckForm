import Vue from 'vue'
import Vuex from 'vuex'
import appeal from './modules/appeal.js'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        appeal,
    },
})
