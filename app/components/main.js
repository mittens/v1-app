import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Colors } from '../styles'

export default class Main extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  }
})
