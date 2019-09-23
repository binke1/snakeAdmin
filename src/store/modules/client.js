
const client = {
  state: {
    uuid: '',
  },

  mutations: {
    SET_CLIENT_UUID: (state, uuid) => {
      state.uuid = uuid
    }
  },

}

export default client
