import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Button, Logo, Main } from '../components'
import { storage } from '../lib'
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
  }

  async componentWillMount() {
    const token = await storage.get('token')

    setTimeout(() => {
      this.setState({
        loading: false
      })

      if (token) {
        this.goHome()
      }
    }, 500)
  }

  login = async () => {
    await storage.put('token', 'token')

    this.goHome()
  }

  goHome() {
    const home = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'app'
        })
      ]
    })

    this.props.navigation.dispatch(home)
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
