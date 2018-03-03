import { API_URI } from 'react-native-dotenv'

import { storage } from '.'

export default {
  token() {
    return storage.get('authToken')
  },

  get(url) {
    return this.request({
      url,
      method: 'GET'
    })
  },
  post(url, data = {}) {
    return this.request({
      data,
      url,
      method: 'POST'
    })
  },
  put(url, data = {}) {
    return this.request({
      data,
      url,
      method: 'PUT'
    })
  },
  delete(url, data = {}) {
    return this.request({
      data,
      url,
      method: 'DELETE'
    })
  },

  async request(options = {}) {
    const token = await this.token()

    const { data, url, method } = options

    const body = data ? JSON.stringify(data) : undefined

    const headers = {
      authorization: token,
      accept: 'application/json',
      'content-type': 'application/json'
    }

    const response = await fetch(API_URI + url, {
      body,
      headers,
      method
    })

    const { status } = response

    const json = await response.json()

    if (status >= 400) {
      const { message } = json

      throw new Error(message)
    }

    return json
  }
}
