import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import { TabBar } from './components'
import { firebase } from './lib'
import { Login, All, Unread, Settings } from './scenes'
import { Colors } from './styles'

const AppNavigator = TabNavigator(
  {
    unread: Unread,
    all: All,
    settings: Settings
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom'
  }
)

export const Navigator = StackNavigator(
  {
    login: Login,
    app: AppNavigator
  },
  {
    cardStyle: {
      shadowColor: 'transparent'
    }
  }
)

class Mittens extends Component {
  componentDidMount() {
    firebase.requestPermissions()

    firebase.clear()
  }

  render() {
    const Main = Platform.OS === 'android' ? View : KeyboardAvoidingView

    return (
      <SafeAreaView style={styles.main}>
        <Main style={styles.main} behavior="padding">
          <Navigator />
        </Main>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
    flex: 1
  }
})

export default connect()(Mittens)
