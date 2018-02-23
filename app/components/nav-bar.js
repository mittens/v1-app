import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Colors, Fonts, Layout } from '../styles'

export default class NavBar extends Component {
  render() {
    const { title } = this.props

    return (
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: Layout.margin
  },
  title: {
    ...Fonts.title,
    color: Colors.text
  }
})
