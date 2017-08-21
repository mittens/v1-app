import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

import { Main, NavBar } from '../components'

export default class Search extends Component {
  static navigationOptions = {
    title: 'Search',
    header: () => <NavBar title="Search" />
  }

  static renderHeader() {
    return <NavBar />
  }

  render() {
    return (
      <Main style={styles.container}>
        <Text>Search</Text>
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
