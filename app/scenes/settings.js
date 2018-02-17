import React, { Component } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { getUser, setToken } from '../actions'
import { Button, Main, NavBar, TextBox } from '../components'
import { Colors, Fonts, Layout } from '../styles'

class Settings extends Component {
  state = {
    notifications: true,
    token: null
  }

  componentDidMount() {
    const { token, getUser } = this.props
    const { data } = token

    this.setState({
      token: data
    })

    getUser()
  }

  toggleNotifications = notifications => {
    this.setState({
      notifications
    })
  }

  save = () => {
    const { setToken } = this.props
    const { token } = this.state

    setToken(token)
  }

  render() {
    const { name, loading, user } = this.props
    const { token, notifications } = this.state

    return (
      <Main>
        <View style={styles.header}>
          <Text style={styles.title}>
            {name ? `Hello, ${name}` : 'Settings'}
          </Text>
        </View>
        <Main style={styles.main}>
          <Text style={styles.subtitle}>Your GitHub token</Text>
          <TextBox
            placeholder="Personal access token"
            onChangeText={token => this.setState({ token })}
            value={token}
          />
          <View style={styles.toggle}>
            <Text style={styles.label}>Push notifications</Text>
            <Switch
              onTintColor={Colors.accent}
              onValueChange={this.toggleNotifications}
              value={notifications}
            />
          </View>
        </Main>
        <View style={styles.footer}>
          <Button label="Save" loading={loading} onPress={this.save} />
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: Layout.margin
  },
  title: {
    ...Fonts.title
  },
  main: {
    paddingHorizontal: Layout.margin
  },
  subtitle: {
    ...Fonts.subtitle,
    marginBottom: Layout.padding,
    marginTop: Layout.margin
  },
  toggle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Layout.margin
  },
  label: {
    ...Fonts.subtitle,
    flex: 1
  },
  footer: {
    padding: Layout.margin
  }
})

const mapStateToProps = state => {
  const { token, user } = state
  const { loading } = token

  const name = get(user, 'data.name', '')
    .split(' ')
    .shift()

  return {
    name,
    loading,
    token,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    setToken: token => dispatch(setToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
