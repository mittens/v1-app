import React, { Component } from 'react'
import { StatusBar, Text, View } from 'react-native'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator,
  TabNavigator
} from 'react-navigation'

import { Main, TabBar } from './components'
import { firebase } from './lib'
import { Login, Home, Search, Notifications, Profile } from './scenes'
import { Colors } from './styles'

export const Tabs = TabNavigator(
  {
    home: {
      screen: Home
    },
    search: {
      screen: Search
    },
    notifications: {
      screen: Notifications
    },
    profile: {
      screen: Profile
    }
  },
  {
    tabBarComponent: TabBar
  }
)

export const Navigator = StackNavigator({
  login: {
    screen: Login
  },
  app: {
    screen: Tabs
  }
})

class GitHub extends Component {
  componentWillMount() {
    firebase.messaging().requestPermissions()
  }

  render() {
    const { dispatch, state } = this.props

    const navigation = addNavigationHelpers({
      dispatch,
      state
    })

    return (
      <Main>
        <StatusBar backgroundColor={Colors.primary} />
        <Navigator navigation={navigation} />
      </Main>
    )
  }
}

const mapStateToProps = ({ dispatch, state }) => ({
  dispatch,
  state
})

export default connect(mapStateToProps)(GitHub)
