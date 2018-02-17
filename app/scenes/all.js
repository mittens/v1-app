import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NavBar } from '../components'

export default class All extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>All</Text>
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
