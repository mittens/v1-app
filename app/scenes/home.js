import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

import { Main, NavBar } from '../components'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    header: () => <NavBar title="Home" />
  }

  static renderHeader() {
    return <NavBar />
  }

  render() {
    return (
      <Main style={styles.container}>
        <Text>Home</Text>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
