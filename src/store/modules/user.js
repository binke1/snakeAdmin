import {getInfo, login, logout} from "@/api/login";
import {register} from "@/api/register";
import {getToken, removeToken, removeUserUuid, setToken, setUserUuid, setCookie} from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    name: '',
    loading: false,
    avatar: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USER_UUID: (state, uuid) => {
      state.userUuid = uuid
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    CLOSE_LOADING: (state) => {
      state.loading = false
    },
    OPEN_LOADING: (state) => {
      state.loading = true
    }
  },

  actions: {
    //Register
    Register({commit}, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        register(userInfo).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    closeLoading: ({ commit }) => {
      commit('CLOSE_LOADING')
    },
    openLoading: ({ commit }) => {
      commit('OPEN_LOADING')
    },
    // Login
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data.result
          setToken(data.token)
          setUserUuid(data.clientUuid)
          commit('SET_TOKEN', data.token)
          commit('SET_USER_UUID', data.clientUuid)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // Get login user info
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data.result
          if(data.companyUuid){
            console.log("companyUuid存在并且存入")
            setCookie('companyUuid', data.companyUuid)
          }else {
            setCookie('companyUuid', '')
          }
          console.log(data)
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // Logout
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserUuid()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // front logout
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserUuid()
        resolve()
      })
    }
  }
}

export default user
