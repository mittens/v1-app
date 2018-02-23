import React, { Component } from 'react'
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import { TabBar } from './components'
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

class GitHub extends Component {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <KeyboardAvoidingView style={styles.main} behavior="padding">
          <Navigator />
        </KeyboardAvoidingView>
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

export default connect()(GitHub)
