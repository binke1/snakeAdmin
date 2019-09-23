const pageParams = {
  state: {
    orderListParams: null
  },
  mutations: {
    setOrderListParams(state, query) {
      state.orderListParams = query
    }
  }
}
export default {
  state: pageParams.state,
  mutations: pageParams.mutations
}
