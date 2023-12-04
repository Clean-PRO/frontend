import FetchAPI, { oauthFetch } from '../utils/fetchAPI'
import { API_URL } from '../constants/constants'

class AuthAPI {
  auth(body) {
    return FetchAPI.post(`${API_URL.AUTH}login/`, { body })
  }
  oauth() {
    return oauthFetch.get(`login/github/`)
  }

  logout(token) {
    return FetchAPI.post(`${API_URL.AUTH}logout/`, { token })
  }

  create(body) {
    return FetchAPI.post(`${API_URL.USERS}`, { body })
  }

  getUser(token) {
    return FetchAPI.get(`${API_URL.USERS}me/`, { token })
  }

  updateUser(id, body, token) {
    return FetchAPI.put(`${API_URL.USERS}${id}/`, { body, token })
  }
}

export default new AuthAPI()
