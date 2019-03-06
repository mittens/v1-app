import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { Colors, Fonts, Layout } from '../styles'

import Text from './text'
import Touchable from './touchable'

export default class Button extends Component {
  render() {
    const { label, loading, style, onPress } = this.props

    if (loading) {
      return (
        <View style={[styles.main, styles.loading, style]}>
          <ActivityIndicator style={styles.spinner} color={Colors.background} />
        </View>
      )
    }

    return (
      <View style={[styles.main, style]}>
        <Touchable style={styles.touchable} onPress={onPress}>
          <Text style={styles.label}>{label}</Text>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.accent,
    borderRadius: Layout.border.radius,
    height: Layout.button.height
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    marginHorizontal: Layout.margin
  },
  touchable: {
    alignItems: 'center',
    height: Layout.button.height,
    justifyContent: 'center'
  },
  label: {
    color: Colors.background,
    fontWeight: Fonts.weight.semibold,
    paddingHorizontal: Layout.button.height / 2
  }
})
