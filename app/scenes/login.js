import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { getConfig, getToken, getUser, login, loginWithToken } from '../actions'
import { mittens } from '../assets'
import { Auth, AuthToken, Button, Main, Spinner } from '../components'
import { Colors, Fonts, Layout } from '../styles'

class Login extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    auth: false,
    withToken: false
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

  loginWithToken = withToken => {
    this.setState({
      withToken
    })
  }

  onCode = code => {
    const { login } = this.props

    login(code)

    this.setState({
      auth: false
    })
  }

  onToken = token => {
    const { loginWithToken } = this.props

    loginWithToken(token)

    this.setState({
      withToken: false
    })
  }

  render() {
    const { config, token, user } = this.props
    const { auth, withToken } = this.state

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

    const loading = config.loading || user.loading

    return (
      <Main>
        <Main style={styles.main}>
          <Image style={styles.logo} source={mittens} />
          <Text style={styles.title}>mittens</Text>
          <Text style={styles.intro}>
            Mittens brings you push notifications from GitHub
          </Text>
        </Main>
        <Button
          style={styles.login}
          label="Login with GitHub"
          loading={loading}
          onPress={this.login}
        />
        {!loading && (
          <Button
            style={styles.loginWithToken}
            styleLabel={styles.loginWithTokenLabel}
            label="Login with personal access token"
            onPress={() => this.loginWithToken(true)}
          />
        )}
        {!!withToken && (
          <AuthToken
            onToken={this.onToken}
            onClose={() => this.loginWithToken(false)}
          />
        )}
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.margin * 2
  },
  logo: {
    height: 90,
    width: 100
  },
  title: {
    color: Colors.primaryDark,
    fontSize: Fonts.size.title,
    marginTop: Layout.margin,
    textAlign: 'center'
  },
  intro: {
    color: Colors.textLight,
    fontSize: 14,
    lineHeight: 22,
    marginTop: Layout.margin,
    textAlign: 'center',
    width: '70%'
  },
  login: {
    margin: Layout.margin
  },
  loginWithToken: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 1,
    margin: Layout.margin,
    marginTop: 0
  },
  loginWithTokenLabel: {
    color: Colors.primary
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
    login: code => dispatch(login(code)),
    loginWithToken: token => dispatch(loginWithToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
