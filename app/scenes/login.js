import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { getConfig, getToken, getUser, login } from '../actions'
import { github } from '../assets'
import { Auth, Button, Main, Spinner } from '../components'
import { Layout } from '../styles'

class Login extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    auth: false
  }

  componentDidMount() {
    const { getToken } = this.props

    getToken()
  }

  componentWillReceiveProps(props) {
    const { config, token, user, navigation, getUser } = props

    if (token.data && user.data) {
      const reset = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'app'
          })
        ]
      })

      navigation.dispatch(reset)
    } else if (token.data && !user.loading && !user.error) {
      getUser()
    } else if (!token.loading && !user.loading && config.data) {
      this.setState({
        auth: true
      })
    }
  }

  login = () => {
    const { getConfig } = this.props

    getConfig()
  }

  onCode = code => {
    const { login } = this.props

    login(code)

    this.setState({
      auth: false
    })
  }

  render() {
    const { config, token, user } = this.props
    const { auth } = this.state

    if (token.loading) {
      return (
        <Main style={styles.main}>
          <Spinner />
        </Main>
      )
    }

    if (auth && config.data) {
      return <Auth config={config.data} onCode={this.onCode} />
    }

    return (
      <Main>
        <Main style={styles.main}>
          <Image style={styles.logo} source={github} />
        </Main>
        <Button
          style={styles.button}
          label="Login"
          loading={config.loading || user.loading}
          onPress={this.login}
        />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 100,
    width: 100
  },
  button: {
    margin: Layout.margin
  }
})

const mapStateToProps = state => {
  const { config, token, user } = state

  return {
    config,
    token,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getConfig: () => dispatch(getConfig()),
    getToken: () => dispatch(getToken()),
    getUser: () => dispatch(getUser()),
    login: code => dispatch(login(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
