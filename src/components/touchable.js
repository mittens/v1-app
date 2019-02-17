import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'

export default class Touchable extends Component {
  render() {
    const { children, onPress, style } = this.props

    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    )
  }
}
