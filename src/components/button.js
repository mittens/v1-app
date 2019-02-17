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
          <ActivityIndicator color={Colors.background} />
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
    borderRadius: Layout.border.radius
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.margin * (2 / 3)
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    color: Colors.background,
    fontWeight: Fonts.weight.semibold,
    margin: Layout.margin * (2 / 3)
  }
})
