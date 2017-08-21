import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

import github from '../assets/github-dark.png'

export default class Logo extends Component {
  render() {
    return <Image style={styles.image} source={github} />
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100
  }
})
