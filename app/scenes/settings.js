import React, { Component } from 'react'
import { Image, StyleSheet, Switch, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { get } from 'lodash'

import { about, help, privacyPolicy, rate } from '../assets'
import { logout, updateUser } from '../actions'
import { Button, Main, NavBar, Touchable } from '../components'
import { link } from '../lib'
import { Colors, Fonts, Layout } from '../styles'

class Settings extends Component {
  static navigationOptions = {
    header: <NavBar title="Settings" />
  }

  state = {
    notifications: true
  }

  componentDidMount() {
    const { user } = this.props

    const badge = get(user, 'data.badge', false)
    const notifications = get(user, 'data.notifications', false)

    this.setState({
      badge,
      notifications
    })
  }

  componentWillReceiveProps(props) {
    const { user } = props

    const badge = get(user, 'data.badge', false)
    const notifications = get(user, 'data.notifications', false)

    this.setState({
      badge,
      notifications
    })
  }

  toggleBadge = badge => {
    const { updateUser } = this.props

    updateUser({
      badge
    })

    this.setState({
      badge
    })
  }

  toggleNotifications = notifications => {
    const { updateUser } = this.props

    updateUser({
      notifications
    })

    this.setState({
      notifications
    })
  }

  logout = async () => {
    const { navigation, logout } = this.props

    await logout()

    const reset = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'login'
        })
      ]
    })

    navigation.dispatch(reset)
  }

  renderLink(id) {
    const base = 'https://mittens.app'

    let icon
    let label
    let uri

    switch (id) {
      case 'privacy-policy':
        label = 'Privacy policy'
        uri = `${base}/privacy-policy`
        icon = privacyPolicy

        break

      case 'about':
        label = 'About Mittens'
        uri = base
        icon = about

        break

      case 'rate':
        label = 'Rate Mittens'
        uri = 'rate-mittens'
        icon = rate

        break

      default:
        return null
    }

    return (
      <View key={id} style={styles.link}>
        <Touchable style={styles.touchable} onPress={() => link.go(uri)}>
          <Image style={styles.icon} source={icon} />
          <Text style={styles.text}>{label}</Text>
        </Touchable>
      </View>
    )
  }

  render() {
    const { badge, notifications } = this.state

    const links = ['privacy-policy', 'about', 'rate']

    return (
      <Main>
        <Main scroll>
          <View style={[styles.toggle, styles.link]}>
            <Text style={styles.label}>Push notifications</Text>
            <Switch
              onTintColor={Colors.accent}
              onValueChange={this.toggleNotifications}
              value={notifications}
            />
          </View>
          <View style={[styles.toggle, styles.link]}>
            <Text style={styles.label}>Badge counter</Text>
            <Switch
              onTintColor={Colors.accent}
              onValueChange={this.toggleBadge}
              value={badge}
            />
          </View>
          {links.map(id => this.renderLink(id))}
        </Main>
        <View style={styles.footer}>
          <Button label="Logout" onPress={this.logout} />
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  toggle: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  label: {
    color: Colors.text,
    flex: 1
  },
  link: {
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  touchable: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  text: {
    color: Colors.text,
    flex: 1,
    marginLeft: Layout.margin
  },
  icon: {
    height: 30,
    width: 30
  },
  footer: {
    padding: Layout.margin
  }
})

const mapStateToProps = state => {
  const { user } = state

  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
