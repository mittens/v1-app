import React, { Component } from 'react'
import {
  Image,
  Linking,
  Modal,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'

import { close, love, mittens } from '../assets'
import { Colors, Layout } from '../styles'

import Text from './text'
import Touchable from './touchable'

export default class Help extends Component {
  web = () => {
    Linking.openURL('https://mittens.app')
  }

  ali = () => {
    Linking.openURL('https://designplox.com')
  }

  render() {
    const { visible, onClose } = this.props

    return (
      <Modal
        animationType="fade"
        onRequestClose={onClose}
        transparent
        visible={visible}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.main}>
            <Touchable onPress={this.web}>
              <Image style={styles.mittens} source={mittens} />
            </Touchable>
            <Text style={styles.title} color={Colors.accent} title>
              mittens
            </Text>
            <Text center>brings you push notifications {'\n'} from GitHub</Text>
            <Touchable style={styles.credits} onPress={this.ali}>
              <Text color={Colors.textLight}>built with</Text>
              <Image style={styles.love} source={love} />
              <Text color={Colors.textLight}>by ali zahid</Text>
            </Touchable>
            <Touchable style={styles.close} onPress={onClose}>
              <Image style={styles.icon} source={close} />
            </Touchable>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    backgroundColor: Colors.modal,
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Layout.padding,
    margin: Layout.margin * 2,
    paddingBottom: Layout.margin * 2,
    paddingHorizontal: Layout.margin,
    paddingTop: Layout.margin * 3
  },
  mittens: {
    ...Layout.mittens
  },
  title: {
    marginBottom: Layout.padding,
    marginTop: Layout.margin * 2
  },
  credits: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Layout.margin * 2
  },
  link: {
    margin: Layout.margin
  },
  love: {
    height: 20,
    marginHorizontal: Layout.padding / 2,
    width: 20
  },
  close: {
    alignItems: 'center',
    alignSelf: 'stretch',
    position: 'absolute',
    right: 0,
    top: 0
  },
  icon: {
    height: Layout.footer.icon.height,
    margin: Layout.margin,
    width: Layout.footer.icon.width
  }
})
