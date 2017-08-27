import storage from './storage'

export default {
  api: {
    url: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  },

  profile() {
    return this.request('/user')
  },

  async request(url, method = 'GET', data) {
    if (!this.token) {
      this.token = await storage.get('token')
    }

    const { api, token } = this

    const response = await fetch(`${api.url}${url}`, {
      method,
      headers: {
        ...api.headers,
        Authorization: `token ${token}`
      },
      body: data && JSON.stringify(data)
    })

    const json = await response.json()

    return json
  }
}
