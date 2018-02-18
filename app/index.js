import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator
} from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import { TabBar } from './components'
import { Login, All, Unread, Settings } from './scenes'
import { Colors } from './styles'

const AppNavigator = TabNavigator(
  {
    unread: {
      screen: Unread
    },
    all: {
      screen: All
    },
    settings: {
      screen: Settings
    }
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom'
  }
)

export const Navigator = StackNavigator(
  {
    login: {
      screen: Login
    },
    app: {
      screen: AppNavigator
    }
  },
  {
    cardStyle: {
      shadowColor: 'transparent'
    }
  }
)

class GitHub extends Component {
  render() {
    const { dispatch, state } = this.props

    const navigation = addNavigationHelpers({
      dispatch,
      state,
      addListener: createReduxBoundAddListener('root')
    })

    const Main = Platform.OS === 'android' ? View : KeyboardAvoidingView

    return (
      <SafeAreaView style={styles.main}>
        <Main style={styles.main} behavior="padding">
          <Navigator navigation={navigation} />
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

const mapStateToProps = ({ dispatch, state }) => ({
  dispatch,
  state
})

export default connect(mapStateToProps)(GitHub)
