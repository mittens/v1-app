import React, { FunctionComponent } from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

interface Props {
  style?: ViewStyle

  onPress: () => void
}

export const Touchable: FunctionComponent<Props> = ({
  children,
  style,
  onPress
}) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  }

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}
