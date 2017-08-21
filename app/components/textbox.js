import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { Colors, Fonts, Layout } from '../styles'

export default class TextBox extends Component {
  constructor(props) {
    super(props)

    this.state = this.transformProps(props)

    this.onChangeText = this.onChangeText.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.transformProps(props)
    })
  }

  getKeyboardType(type) {
    switch (type) {
      case 'email':
        return 'email-address'

      case 'password':
        return 'default'

      default:
        return type
    }
  }

  transformProps(props) {
    const { secure, type, value } = props

    return {
      ...props,
      keyboardType: this.getKeyboardType(type),
      secureTextEntry: secure === true || type === 'password',
      value: value || ''
    }
  }

  onChangeText(value) {
    this.setState({
      value
    })

    const { onChangeText } = this.state

    if (onChangeText) {
      onChangeText(value)
    }
  }

  render() {
    const {
      keyboardType,
      lines,
      placeholder,
      secureTextEntry,
      style,
      styleInput,
      value
    } = this.state

    const height = {}

    if (lines > 0) {
      height.height = lines * Layout.inputHeight
      height.lineHeight = Layout.inputHeight
    }

    return (
      <View style={[styles.container, style]}>
        <TextInput
          keyboardType={keyboardType}
          multiline={lines > 0}
          onChangeText={this.onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={[styles.input, styleInput, height]}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 2,
    minWidth: 300
  },
  input: {
    color: Colors.text,
    fontSize: Fonts.input,
    height: Layout.inputHeight,
    paddingHorizontal: Layout.margin
  }
})
