import {
  CODE_PUSH_KEY_ANDROID,
  CODE_PUSH_KEY_IOS,
  SENTRY_DSN
} from 'react-native-dotenv'

import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Sentry } from 'react-native-sentry'
import { connect } from 'react-redux'
import codePush from 'react-native-code-push'

import { Landing, Notifications } from './scenes'

Sentry.config(SENTRY_DSN).install()

class Mittens extends Component {
  render() {
    const { user } = this.props

    if (user) {
      return <Notifications />
    }

    return <Landing />
  }
}

const mapStateToProps = ({ user: { user } }) => ({
  user
})

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  deploymentKey: Platform.select({
    android: CODE_PUSH_KEY_ANDROID,
    ios: CODE_PUSH_KEY_IOS
  }),
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(connect(mapStateToProps)(Mittens))
