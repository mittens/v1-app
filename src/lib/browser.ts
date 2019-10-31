import { StatusBar } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'

class Browser {
  async open(uri: string) {
    await InAppBrowser.isAvailable()

    const old = this.switchStatusBar()

    const response = await InAppBrowser.open(uri)

    this.switchStatusBar(old)

    return response
  }

  async openAuth(uri: string, deeplink: string) {
    await InAppBrowser.isAvailable()

    const old = this.switchStatusBar()

    const response = await InAppBrowser.openAuth(uri, deeplink)

    this.switchStatusBar(old)

    return response
  }

  switchStatusBar(old?: any) {
    if (old) {
      return StatusBar.popStackEntry(old)
    }

    return StatusBar.pushStackEntry({
      animate: true,
      barStyle: 'light-content'
    })
  }
}

export const browser = new Browser()
