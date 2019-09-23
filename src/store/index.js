import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import client from './modules/client'
import permission from './modules/permission'
import currency from './modules/currency'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    client,
    permission,
    currency,
    // group
  },
  getters
})

export default store
