import React, { Component } from 'react'
import {
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
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
          <ScrollView
            style={styles.main}
            contentContainerStyle={styles.content}
          >
            <Touchable onPress={this.web}>
              <Image style={styles.mittens} source={mittens} />
            </Touchable>
            <Text style={styles.title} color={Colors.accent} title>
              mittens
            </Text>
            <Text center>brings you push notifications {'\n'} from GitHub</Text>
            <View style={styles.help}>
              <Text center subtitle>
                tips
              </Text>
              <Text style={styles.tip} center small>
                swipe right on a notification to mark as read
              </Text>
              <Text style={styles.tip} center small>
                swipe left on a notification to mark as read and open in browser
              </Text>
              <Text style={styles.tip} center small>
                tap the double ticks on the top right to mark all as read
              </Text>
            </View>
            <Touchable style={styles.credits} onPress={this.ali}>
              <Text color={Colors.textLight}>built with</Text>
              <Image style={styles.love} source={love} />
              <Text color={Colors.textLight}>by ali zahid</Text>
            </Touchable>
            <Touchable style={styles.close} onPress={onClose}>
              <Image style={styles.icon} source={close} />
            </Touchable>
          </ScrollView>
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
    backgroundColor: Colors.background,
    borderRadius: Layout.padding,
    margin: Layout.margin * 2,
    flexGrow: 0
  },
  content: {
    alignItems: 'center',
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
  help: {
    backgroundColor: Colors.backgroundDark,
    marginHorizontal: -Layout.margin,
    marginVertical: Layout.margin,
    padding: Layout.margin
  },
  tip: {
    marginTop: Layout.padding
  },
  credits: {
    alignItems: 'center',
    flexDirection: 'row'
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
