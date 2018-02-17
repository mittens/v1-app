import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { startCase } from 'lodash'

import { Touchable } from './'
import { cog } from '../assets'
import { Colors, Fonts, Layout } from '../styles'

export default class TabBar extends Component {
  render() {
    const { navigation, jumpToIndex } = this.props
    const { routes } = navigation.state

    return (
      <View style={styles.main}>
        {routes.map(({ key, routes }, index) => {
          const current = navigation.state.index === index

          const settings = key === 'settings'

          return (
            <Touchable
              key={key}
              style={[styles.button, settings && styles.settings]}
              onPress={() => jumpToIndex(index)}
            >
              {settings && (
                <Image
                  style={[styles.icon, current && styles.active]}
                  source={cog}
                />
              )}
              {!settings && (
                <Text style={[styles.label, current && styles.current]}>
                  {startCase(key)}
                </Text>
              )}
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
  settings: {
    flex: 0,
    width: Layout.tabBarHeight
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
