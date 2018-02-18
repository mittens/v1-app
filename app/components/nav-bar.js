import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Touchable } from './'
import { Colors, Fonts, Layout } from '../styles'

export default class NavBar extends Component {
  render() {
    const { back, title } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: Layout.navBarHeight,
    justifyContent: 'center',
    paddingHorizontal: Layout.margin
  },
  title: {
    ...Fonts.title,
    color: Colors.text
  }
})
