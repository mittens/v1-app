import { AsyncStorage } from 'react-native'

export default {
  prefix: '@github:',

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(this.prefix + key)

      if (value) {
        return JSON.parse(value)
      }
    } catch (e) {}
  },
  async put(key, value) {
    try {
      const string = JSON.stringify(value)

      await AsyncStorage.setItem(this.prefix + key, string)
    } catch (e) {}
  },
  async remove(key) {
    try {
      await AsyncStorage.removeItem(this.prefix + key)
    } catch (e) {}
  },
  async clear() {
    try {
      await AsyncStorage.clear()
    } catch (e) {}
  }
}
