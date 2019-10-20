import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { View } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { TabBar } from './components'
import { firebase } from './lib'
import { Help, Login, Notifications } from './scenes'
import { colors } from './styles'

const Navigator = createBottomTabNavigator(
  {
    Help,
    Notifications
  },
  {
    initialRouteName: 'Notifications',
    tabBarComponent: TabBar
  }
)

const Container = createAppContainer(Navigator)

export const Mittens: FunctionComponent = () => {
  const styles = useDynamicStyleSheet(stylesheet)

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    firebase.onUser(user => setUser(user))

    firebase.updateToken()
  }, [])

  return <View style={styles.main}>{user ? <Container /> : <Login />}</View>
}

const stylesheet = new DynamicStyleSheet({
  main: {
    backgroundColor: colors.background,
    flex: 1
  }
})
