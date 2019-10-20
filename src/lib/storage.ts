import AsyncStorage from '@react-native-community/async-storage'

class Storage {
  get(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key)
  }

  set(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value)
  }

  remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key)
  }
}

export const storage = new Storage()
