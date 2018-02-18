import { storage } from './'

export default {
  host: 'https://api.github.com',

  async get(url) {
    const token = await storage.get('token')

    if (url.includes('?')) {
      url += `&access_token=${token}`
    } else {
      url += `?access_token=${token}`
    }

    url += `&v=${Date.now()}`

    const { host } = this

    const request = await fetch(host + url)

    const json = await request.json()

    const { status } = request

    console.log(url, status, json)

    if (status >= 400) {
      const { message } = json

      throw new Error(message)
    }

    return json
  }
}
