import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Colors } from '../styles'

import home from '../assets/home.png'
import search from '../assets/search.png'
import notifications from '../assets/notifications.png'
import profile from '../assets/profile.png'

const icons = {
  home,
  search,
  notifications,
  profile
}

export default class TabBar extends Component {
  render() {
    const { navigation, jumpToIndex } = this.props
    const { routes } = navigation.state

    return (
      <View style={styles.container}>
        {routes.map(({ key }, index) => {
          const current = navigation.state.index === index

          return (
            <TouchableOpacity
              key={key}
              style={styles.button}
              onPress={() => jumpToIndex(index)}
            >
              <Image
                style={[styles.icon, current && styles.current]}
                source={icons[key]}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Colors.shadow,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  icon: {
    height: 20,
    opacity: 0.25,
    width: 20
  },
  current: {
    opacity: 1
  }
})
