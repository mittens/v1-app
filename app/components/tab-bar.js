import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { Touchable } from '.'
import { all, unread, settings } from '../assets'
import { Colors, Fonts, Layout } from '../styles'

const icons = {
  all,
  unread,
  settings
}

export default class TabBar extends Component {
  render() {
    const { navigation, jumpToIndex } = this.props
    const { routes } = navigation.state

    return (
      <View style={styles.main}>
        {routes.map(({ key, routes }, index) => {
          const current = navigation.state.index === index

          return (
            <Touchable
              key={key}
              style={styles.button}
              onPress={() => jumpToIndex(index)}
            >
              <Image
                style={[styles.icon, current && styles.active]}
                source={icons[key]}
              />
            </Touchable>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
    borderTopColor: Colors.borderLight,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: Layout.tabBarHeight,
    justifyContent: 'center'
  },
  icon: {
    height: 20,
    opacity: 0.25,
    width: 20
  },
  active: {
    opacity: 1
  },
  text: {
    justifyContent: 'center'
  },
  label: {
    color: Colors.textLight
  },
  current: {
    color: Colors.accent
  },
  badge: {
    backgroundColor: Colors.failure,
    borderRadius: 10,
    height: 10,
    left: '100%',
    marginLeft: 5,
    position: 'absolute',
    width: 10
  }
})
