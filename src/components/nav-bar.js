import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'

import { mark_all_as_read } from '../assets'
import { Colors, Layout } from '../styles'

import Text from './text'
import Touchable from './touchable'

export default class NavBar extends Component {
  render() {
    const { title, markAllAsRead } = this.props

    return (
      <SafeAreaView style={styles.main}>
        <Text style={styles.title} title>
          {title}
        </Text>
        <Touchable onPress={markAllAsRead}>
          <Image style={styles.icon} source={mark_all_as_read} />
        </Touchable>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    margin: Layout.margin
  },
  icon: {
    height: Layout.footer.icon.height,
    margin: Layout.margin,
    width: Layout.footer.icon.width
  }
})
