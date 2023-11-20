export const initialState = {
  orders: [],

  newOrders: [],
  accepted: [],
  finished: [],
  cancelled: [],
  filtred: [],

  search: false,

  newOrder: null,
  repeatOrder: null,
  repeatedTotal: null,

  orderStatus: 'initial',
  orderError: null,

  userOrdersStatus: 'initial',
  userOrdersError: null,
}
