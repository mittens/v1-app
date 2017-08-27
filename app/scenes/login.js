import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Button, Logo, Main } from '../components'
import { oauth, storage } from '../lib'
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
    const github = await oauth.login()

    await storage.put('id', github.response.identifier)
    await storage.put('token', github.response.credentials.accessToken)

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
    const { loading } = this.state

    return (
      <Main>
        <Main style={styles.main}>
          <Logo />
          {loading &&
            <ActivityIndicator style={styles.spinner} color={Colors.primary} />}
        </Main>
        {loading ||
          <Button style={styles.login} label="Login" onPress={this.login} />}
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
