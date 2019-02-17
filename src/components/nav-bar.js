import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import { Colors, Layout } from '../styles'

import Text from './text'

export default class NavBar extends Component {
  render() {
    const { title } = this.props

    return (
      <SafeAreaView style={styles.main}>
        <Text style={styles.title} title>
          {title}
        </Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.background
  },
  title: {
    margin: Layout.margin
  }
})
