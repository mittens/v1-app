import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Main } from '../components'

export default class Unread extends Component {
  render() {
    return (
      <Main style={styles.main}>
        <Text>Unread</Text>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
