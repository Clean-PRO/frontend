const getAllOrders = state => state.order.orders
const getRepeatedOrder = state => state.order.repeatOrder
const getRepeatedTotal = state => state.order.repeatedTotal
const getFiltred = state => state.order.filtred
const getSearch = state => state.order.search

export const orderSelectors = {
  getAllOrders,
  getRepeatedOrder,
  getRepeatedTotal,
  getFiltred,
  getSearch,
}
