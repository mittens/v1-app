import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Participating extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Participating</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
