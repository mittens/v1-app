import { StatusBar } from 'react-native'
import { initialMode } from 'react-native-dark-mode'
import InAppBrowser from 'react-native-inappbrowser-reborn'

class Browser {
  async open(uri: string) {
    const isLight = initialMode === 'light'

    StatusBar.setBarStyle('light-content')

    const response = await InAppBrowser.open(uri)

    if (isLight) {
      StatusBar.setBarStyle('dark-content')
    }

    return response
  }

  async openAuth(uri: string, deeplink: string) {
    const isLight = initialMode === 'light'

    StatusBar.setBarStyle('light-content')

    const response = await InAppBrowser.openAuth(uri, deeplink)

    if (isLight) {
      StatusBar.setBarStyle('dark-content')
    }

    return response
  }
}

export const browser = new Browser()
