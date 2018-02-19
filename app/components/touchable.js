import React, { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'

export default class Touchable extends Component {
  render() {
    const { children, onPress, style } = this.props

    return (
      <TouchableOpacity style={style} onPress={onPress}>
        {children}
      </TouchableOpacity>
    )
  }
}
