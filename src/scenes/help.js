import React, { Component } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'

import { love, mittens } from '../assets'
import { Text, Touchable } from '../components'
import { Colors, Layout } from '../styles'

export default class Help extends Component {
  web = () => {
    InAppBrowser.open('https://mittens.app')
  }

  ali = () => {
    InAppBrowser.open('https://alizahid.dev')
  }

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <ScrollView contentContainerStyle={styles.content}>
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
              &bull; swipe right on a notification to view actions to open or
              mark as read
            </Text>
            <Text style={styles.tip} center small>
              &bull; tap the icon on the top right to mark all notifications as
              read
            </Text>
          </View>
          <Touchable style={styles.credits} onPress={this.ali}>
            <Text color={Colors.textLight}>built with</Text>
            <Image style={styles.love} source={love} />
            <Text color={Colors.textLight}>by ali zahid</Text>
          </Touchable>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center'
  },
  mittens: {
    ...Layout.mittens
  },
  title: {
    marginBottom: Layout.padding,
    marginTop: Layout.margin * 2
  },
  help: {
    marginHorizontal: Layout.margin,
    marginVertical: Layout.margin * 2
  },
  tip: {
    marginTop: Layout.padding
  },
  credits: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  love: {
    ...Layout.icon,
    marginHorizontal: Layout.padding / 2
  }
})
