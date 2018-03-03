import { AsyncStorage } from 'react-native'

export default {
  prefix: '@mittens:',

  async get(key) {
    const value = await AsyncStorage.getItem(this.prefix + key)

    if (value) {
      return JSON.parse(value)
    }
  },
  async put(key, value) {
    const string = JSON.stringify(value)

    await AsyncStorage.setItem(this.prefix + key, string)
  },
  async remove(key) {
    await AsyncStorage.removeItem(this.prefix + key)
  },
  async clear() {
    await AsyncStorage.clear()
  }
}
