import { API_URL } from '../constants/constants'
import FetchApi from '../utils/fetchAPI'

class OrdersApi {
  getOrders(token) {
    return FetchApi.get(`${API_URL.ORDERS}`, { token })
  }

  createOrder(token, body) {
    return FetchApi.post(`${API_URL.ORDERS}`, { token, body })
  }

  repeatOrder(token, id) {
    return FetchApi.get(`${API_URL.ORDERS}${id}/`, { token, id })
  }

  updateOrder(order, token, body) {
    return FetchApi.put(`/orders/${order}/`, { token, body })
  }
}

export default new OrdersApi()
