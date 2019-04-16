import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { logout } from '../actions'
import { exit, filters, help, notifications } from '../assets'
import { Layout } from '../styles'

import Touchable from './touchable'

const icons = {
  Filters: filters,
  Help: help,
  Logout: exit,
  Notifications: notifications
}

class TabBar extends Component {
  render() {
    const {
      logout,
      onTabPress,
      navigation: {
        state: { index, routes }
      }
    } = this.props

    return (
      <SafeAreaView style={styles.main}>
        {routes.map((route, current) => (
          <Touchable
            style={styles.link}
            key={route.key}
            onPress={() => onTabPress({ route })}
          >
            <Image
              style={[styles.icon, current === index && styles.active]}
              source={icons[route.key]}
            />
          </Touchable>
        ))}
        <Touchable style={styles.link} onPress={logout}>
          <Image style={styles.icon} source={exit} />
        </Touchable>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  link: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Layout.footer.margin
  },
  icon: {
    ...Layout.icon,
    opacity: 0.5
  },
  active: {
    opacity: 1
  }
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  null,
  mapDispatchToProps
)(TabBar)
