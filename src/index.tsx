import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { Spinner, TabBar } from './components'
import { firebase } from './lib'
import { Help, Login, Notifications } from './scenes'

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
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    firebase.onUser(user => {
      setLoading(false)
      setUser(user)

      if (user) {
        firebase.updateToken()
      }
    })
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (user) {
    return <Container />
  }

  return <Login />
}
