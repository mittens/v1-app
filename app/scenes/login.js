import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { getToken, setToken } from '../actions'
import { github } from '../assets'
import { Button, Main, Spinner, TextBox } from '../components'
import { Layout } from '../styles'

class Login extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    token: ''
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
    const { setToken } = this.props
    const { token } = this.state

    if (token) {
      setToken(token)
    }
  }

  render() {
    const { loading } = this.props
    const { token } = this.state

    return (
      <Main>
        <View style={styles.main}>
          <Image style={styles.logo} source={github} />
          {!token && loading && <Spinner />}
        </View>
        {(token || !loading) && (
          <View style={styles.login}>
            <TextBox
              placeholder="Personal access token"
              onChangeText={token => this.setState({ token })}
            />
            <Button
              style={styles.button}
              label="Save"
              loading={loading}
              onPress={this.login}
            />
          </View>
        )}
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
  logo: {
    alignSelf: 'center',
    height: 100,
    marginBottom: Layout.margin * 2,
    width: 100
  },
  login: {
    padding: Layout.margin
  },
  button: {
    marginTop: Layout.margin
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
