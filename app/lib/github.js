import { storage } from '.'

export default {
  host: 'https://api.github.com',

  token() {
    return storage.get('githubToken')
  },

  get(url) {
    return this.request({
      url,
      method: 'GET'
    })
  },
  put(url, data = {}) {
    return this.request({
      data,
      url,
      method: 'PUT'
    })
  },

  async request(options = {}) {
    const token = await this.token()

    const { host } = this
    const { data, url, method } = options

    const body = data ? JSON.stringify(data) : undefined

    const headers = {
      authorization: `token ${token}`
    }

    const response = await fetch(host + url, {
      body,
      headers,
      method
    })

    const { status } = response

    if (status === 205) {
      return true
    }

    const json = await response.json()

    if (status >= 400) {
      const { message } = json

      throw new Error(message)
    }

    return json
  }
}
