import React, { Component } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { get } from 'lodash'

import { getProfile, logout, toggleNotifications } from '../actions'
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
    const { getProfile, user } = this.props

    getProfile()

    const notifications = get(user, 'data.notifications', false)

    this.setState({
      notifications
    })
  }

  componentWillReceiveProps(props) {
    const { user } = props

    const notifications = get(user, 'data.notifications', false)

    this.setState({
      notifications
    })
  }

  toggleNotifications = notifications => {
    const { toggleNotifications } = this.props

    toggleNotifications(notifications)

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
          {!!name && <Text style={styles.name}>Hello, {name}</Text>}
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
  name: {
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
    flex: 1
  },
  footer: {
    padding: Layout.margin
  }
})

const mapStateToProps = state => {
  const { profile, user } = state

  const name = (get(profile, 'data.name', '') || get(profile, 'data.login', ''))
    .split(' ')
    .shift()

  return {
    name,
    profile,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile()),
    logout: () => dispatch(logout()),
    toggleNotifications: notifications =>
      dispatch(toggleNotifications(notifications))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
