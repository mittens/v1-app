import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Colors, Fonts, Layout } from '../styles'

import Text from './text'
import Touchable from './touchable'

export default class Button extends Component {
  render() {
    const { label, style, onPress } = this.props

    return (
      <View style={[styles.main, style]}>
        <Touchable style={styles.touchable} onPress={onPress}>
          <Text style={styles.label} color={Colors.background}>
            {label}
          </Text>
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
  touchable: {
    alignItems: 'center',
    height: Layout.button.height,
    justifyContent: 'center'
  },
  label: {
    fontWeight: Fonts.weight.semibold,
    paddingHorizontal: Layout.button.height / 2
  }
})
