import React, { Component } from 'react'
import {
  I18nManager,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Colors, Fonts, Layout } from '../styles'

import left from '../assets/left.png'

export default class NavBar extends Component {
  render() {
    const { action, back, navigation, title } = this.props

    return (
      <View style={styles.container}>
        {back &&
          <TouchableOpacity style={styles.left} onPress={navigation.goBack}>
            <Image style={styles.image} source={left} />
          </TouchableOpacity>}
        <Text style={styles.title}>
          {title}
        </Text>
        {action &&
          <TouchableOpacity style={styles.right} onPress={action.onPress}>
            <Image style={styles.image} source={action.icon} />
          </TouchableOpacity>}
      </View>
    )
  }
}

const top = Platform.OS === 'ios' ? 20 : 0

const styles = StyleSheet.create({
  container: {
    ...Colors.shadow,
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: top + 50,
    justifyContent: 'center',
    paddingTop: top
  },
  left: {
    position: 'absolute',
    left: 0,
    top,
    transform: [
      {
        scaleX: I18nManager.isRTL ? -1 : 1
      }
    ]
  },
  right: {
    position: 'absolute',
    right: 0,
    top,
    transform: [
      {
        scaleX: I18nManager.isRTL ? -1 : 1
      }
    ]
  },
  image: {
    height: 20,
    margin: Layout.margin,
    width: 20
  },
  title: {
    ...Fonts.navBar,
    color: Colors.text
  }
})
