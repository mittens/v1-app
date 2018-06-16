import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import { connect } from 'react-redux'

import { TabBar } from './components'
import { firebase } from './lib'
import { Login, Read, Settings, Unread } from './scenes'
import { Colors } from './styles'

const AppNavigator = createBottomTabNavigator(
  {
    unread: createStackNavigator({
      Unread
    }),
    read: createStackNavigator({
      Read
    }),
    settings: createStackNavigator({
      Settings
    })
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom'
  }
)

export const Navigator = createStackNavigator(
  {
    login: Login,
    app: AppNavigator
  },
  {
    cardStyle: {
      shadowColor: 'transparent'
    },
    headerMode: 'none'
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
