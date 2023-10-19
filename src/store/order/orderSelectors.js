const getAllOrders = state => state.order.orders
const getRepeatedOrder = state => state.order.repeatOrder
const getRepeatedTotal = state => state.order.repeatedTotal
const getNewOrders = state => state.order.newOrders
const getCancelled = state => state.order.cancelled
const getFinished = state => state.order.finished
const getAccepted = state => state.order.accepted

export const orderSelectors = {
  getAllOrders,
  getRepeatedOrder,
  getRepeatedTotal,
  getNewOrders,
  getCancelled,
  getFinished,
  getAccepted,
}
