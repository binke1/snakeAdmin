const currency = {
  state: {
    coin: '',
  },

  mutations: {
    SET_COIN: (state, coin) => {
      state.coin = coin
    }
  },

}

export default currency
