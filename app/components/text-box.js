import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { Colors, Layout } from '../styles'

export default class TextBox extends Component {
  state = {
    focused: false
  }

  onFocus = () => {
    this.setState({
      focused: true
    })
  }

  onBlur = () => {
    this.setState({
      focused: false
    })
  }

  render() {
    const { placeholder, style, value, onChangeText } = this.props
    const { focused } = this.state

    return (
      <View style={[styles.main, focused && styles.focused, style]}>
        <TextInput
          style={styles.input}
          onBlur={this.onBlur}
          onChangeText={onChangeText}
          onFocus={this.onFocus}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
          value={value}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius,
    borderWidth: Layout.borderWidth
  },
  focused: {
    borderColor: Colors.primary
  },
  input: {
    color: Colors.text,
    height: Layout.textboxHeight - 2,
    paddingHorizontal: Layout.margin
  }
})
