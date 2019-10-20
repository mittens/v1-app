import React, { FunctionComponent } from 'react'
import { ActivityIndicator, Text, View, ViewStyle } from 'react-native'
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  useDynamicValue
} from 'react-native-dark-mode'

import { colors, fonts, layout } from '../styles'
import { Touchable } from './touchable'

interface Props {
  label: string
  loading?: boolean
  style?: ViewStyle

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({
  label,
  loading,
  style,
  onPress
}) => {
  const styles = useDynamicStyleSheet(stylesheet)
  const color = useDynamicValue(colors.background)

  const Main = loading ? View : Touchable

  return (
    <Main style={[styles.main, style]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      {loading && (
        <ActivityIndicator style={styles.spinner} color={color} size="small" />
      )}
    </Main>
  )
}

const stylesheet = new DynamicStyleSheet({
  label: {
    ...fonts.regular,
    color: colors.background
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: layout.border.radius,
    flexDirection: 'row',
    height: layout.button.height,
    paddingHorizontal: layout.margin
  },
  spinner: {
    marginLeft: layout.padding
  }
})
