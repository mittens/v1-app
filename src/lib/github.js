class GitHub {
  setToken(token) {
    this.token = token
  }

  async getUser() {
    const { token } = this

    const user = await this.request('/user')

    return {
      ...user,
      token
    }
  }

  getNotifications() {
    return this.request('/notifications?all=true')
  }

  markAsRead(id) {
    return this.request(`/notifications/threads/${id}`, 'PATCH')
  }

  async request(uri, method = 'GET') {
    const { token } = this

    if (!token) {
      throw new Error('Token not found')
    }

    const headers = {
      accept: 'application/json',
      authorization: `token ${token}`,
      'content-type': 'application/json'
    }

    const response = await fetch(`https://api.github.com${uri}`, {
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

export default new GitHub()
