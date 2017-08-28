import { API_URL, API_NAMESPACE } from 'react-native-dotenv'

import storage from './storage'

export default {
  url: API_URL,
  namespace: API_NAMESPACE,

  get(url) {
    return this.request(url)
  },
  post(url, data) {
    return this.request(url, 'POST', data)
  },
  put(url, data) {
    return this.request(url, 'PUT', data)
  },

  async request(url, method = 'GET', data) {
    if (!this.token) {
      this.token = await storage.get('token')
    }

    console.log('request', url, method, data)

    const response = await fetch(`${this.url}/${this.namespace}${url}`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: data && JSON.stringify(data)
    })

    const json = await response.json()

    console.log('response', url, method, json)

    return json
  }
}
