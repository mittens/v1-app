import {
  CODE_PUSH_KEY_ANDROID,
  CODE_PUSH_KEY_IOS,
  SENTRY_DSN
} from 'react-native-dotenv'

import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Sentry } from 'react-native-sentry'
import { connect } from 'react-redux'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import codePush from 'react-native-code-push'

import { TabBar } from './components'
import { Filters, Help, Login, Notifications } from './scenes'

Sentry.config(SENTRY_DSN).install()

const Navigator = createBottomTabNavigator(
  {
    Notifications,
    Filters,
    Help
  },
  {
    initialRouteName: 'Notifications',
    tabBarComponent: TabBar
  }
)

const Container = createAppContainer(Navigator)

class Mittens extends Component {
  render() {
    const { user } = this.props

    if (user) {
      return <Container />
    }

    return <Login />
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
