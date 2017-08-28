import React, { Component } from 'react'
import { ActivityIndicator, Platform, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Button, Logo, Main } from '../components'
import { api, firebase, oauth, storage } from '../lib'
import { Colors, Layout } from '../styles'

export default class Login extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }

    this.login = this.login.bind(this)
  }

  async componentWillMount() {
    const token = await storage.get('token')

    if (token) {
      this.goHome()
    } else {
      this.setState({
        loading: false
      })
    }
  }

  async login() {
    this.setState({
      fetching: true
    })

    const github = await oauth.login()

    const { identifier, credentials } = github

    const token = credentials.accessToken

    await storage.put('token', token)

    const profile = await oauth.manager.makeRequest(
      'github',
      'https://api.github.com/user'
    )

    const { email, login: username } = profile.data

    const firebaseToken = await firebase.messaging().getToken()

    const user = await api.post('/users', {
      identifier,
      email,
      username,
      token,
      device: {
        platform: Platform.OS,
        token: firebaseToken
      }
    })

    this.goHome()
  }

  goHome() {
    const { dispatch } = this.props.navigation

    const home = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'app'
        })
      ]
    })

    dispatch(home)
  }

  render() {
    const { fetching, loading } = this.state

    return (
      <Main>
        <Main style={styles.main}>
          <Logo />
          {loading &&
            <ActivityIndicator style={styles.spinner} color={Colors.primary} />}
        </Main>
        {loading ||
          <Button
            style={styles.login}
            label="Login"
            loading={fetching}
            onPress={this.login}
          />}
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  spinner: {
    marginTop: Layout.margin
  },
  login: {
    margin: Layout.margin
  }
})
