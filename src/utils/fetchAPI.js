import { TOKEN_KEY } from './tokenActions'

const BASE_URL = 'https://cleanpro.webtm.ru/api'

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
}

class FetchAPI {
  constructor(apiUrl) {
    this.API_URL = apiUrl
  }

  getURL() {
    return this.API_URL
  }

  async get(url, options) {
    return await baseFetch(this.API_URL + url, METHODS.GET, options)
  }

  async post(url, options) {
    return await baseFetch(this.API_URL + url, METHODS.POST, options)
  }

  async delete(url) {
    return await baseFetch(this.API_URL + url, METHODS.DELETE)
  }

  async put(url, options) {
    return await baseFetch(this.API_URL + url, METHODS.PUT, options)
  }

  async patch(url, options) {
    return await baseFetch(this.API_URL + url, METHODS.PATCH, options)
  }
}

const baseFetch = async (url, method, options = {}) => {
  const { body = null, token = null } = options

  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Token ${token[TOKEN_KEY]}`
    headers['Access-Control-Allow-Credentials'] = true
  }

  const fetchOptions = {
    method,
    headers,
  }

  if (body !== null) {
    fetchOptions.body = JSON.stringify(body)
  }

  if (token === null && body !== null) {
    fetchOptions.credentials = 'include'
  }

  try {
    const response = await fetch(url, fetchOptions)

    if (response.status === 204) {
      return {}
    }

    const result = await response.json()

    if (!response.ok) {
      return Promise.reject(result)
    }

    return result
  } catch (e) {
    return Promise.reject(e)
  }
}

export default new FetchAPI(BASE_URL)

export const oauthFetch = new FetchAPI('http://localhost/oauth/')
