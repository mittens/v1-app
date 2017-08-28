import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

import { Main, NavBar } from '../components'
import { storage } from '../lib'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    header: () => <NavBar title="Home" />
  }

  // async componentWillMount() {
  //   await storage.remove('id')
  //   await storage.remove('token')
  // }

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
