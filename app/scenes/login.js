import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { getToken, setToken } from '../actions'
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
    const { data, navigation } = props

    if (data) {
      const reset = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'app'
          })
        ]
      })

      navigation.dispatch(reset)
    }
  }

  login = () => {
    this.setState({
      auth: true
    })
  }

  onToken = token => {
    this.setState({
      auth: false
    })

    const { setToken } = this.props

    setToken(token)
  }

  render() {
    const { loading } = this.props
    const { auth } = this.state

    if (loading) {
      return (
        <Main style={styles.main}>
          <Spinner />
        </Main>
      )
    }

    if (auth) {
      return <Auth onToken={this.onToken} />
    }

    return (
      <Main>
        <Main style={styles.main}>
          <Image style={styles.logo} source={github} />
        </Main>
        <Button style={styles.button} label="Login" onPress={this.login} />
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
  const { data, loading } = state.token

  return {
    data,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getToken: () => dispatch(getToken()),
    setToken: token => dispatch(setToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
