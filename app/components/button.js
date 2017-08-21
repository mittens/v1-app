import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native'

import { Colors, Layout } from '../styles'

export default class Button extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props
    })
  }

  render() {
    const { label, loading, onPress, style, styleLabel, type } = this.state

    return (
      <View style={[styles.container, style]}>
        {loading &&
          <View style={styles.touchable}>
            <ActivityIndicator color={styles.label.color} />
          </View>}
        {!loading &&
          <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <Text style={[styles.label, styleLabel]}>
              {label}
            </Text>
          </TouchableOpacity>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 4
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.buttonHeight
  },
  label: {
    color: Colors.background,
    marginHorizontal: Layout.padding
  }
})
