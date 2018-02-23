import React, { Component } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { get } from 'lodash'

import { getUser, logout } from '../actions'
import { Button, Main, NavBar, TextBox } from '../components'
import { Colors, Fonts, Layout } from '../styles'

class Settings extends Component {
  static navigationOptions = {
    header: <NavBar title="Settings" />
  }

  state = {
    notifications: true
  }

  componentDidMount() {
    const { getUser } = this.props

    getUser()
  }

  toggleNotifications = notifications => {
    this.setState({
      notifications
    })
  }

  logout = async () => {
    const { navigation, logout } = this.props

    await logout()

    const reset = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'login'
        })
      ]
    })

    navigation.dispatch(reset)
  }

  render() {
    const { name } = this.props
    const { notifications } = this.state

    return (
      <Main>
        <Main style={styles.main}>
          {!!name && <Text style={styles.subtitle}>Hello, {name}</Text>}
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
          <Button label="Logout" onPress={this.logout} />
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
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
  const { user } = state

  const name = (get(user, 'data.name', '') || get(user, 'data.login', ''))
    .split(' ')
    .shift()

  return {
    name,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
