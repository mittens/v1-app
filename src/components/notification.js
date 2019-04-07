import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import moment from 'moment'

import { Colors, Layout } from '../styles'

import Text from './text'
import Touchable from './touchable'

export default class Notification extends Component {
  renderLeftActions = () => {
    return (
      <View style={styles.actions}>
        <Touchable style={styles.action} onPress={() => this.action(true)}>
          <Text color={Colors.primary}>open</Text>
        </Touchable>
        <Touchable style={styles.action} onPress={() => this.action(false)}>
          <Text color={Colors.accent}>mark as read</Text>
        </Touchable>
      </View>
    )
  }

  action = open => {
    const { item, markAsRead } = this.props

    markAsRead(item, open)

    this.swipeable.close()
  }

  render() {
    const { item } = this.props

    const {
      unread,
      updated_at,
      repository: {
        name,
        owner: { avatar_url }
      },
      subject: { title }
    } = item

    return (
      <Swipeable
        ref={swipeable => {
          this.swipeable = swipeable
        }}
        renderLeftActions={this.renderLeftActions}
      >
        <View style={styles.main}>
          <Image
            style={styles.image}
            source={{
              uri: avatar_url
            }}
          />
          <View style={styles.details}>
            <Text
              style={styles.subject}
              color={unread ? Colors.text : Colors.textLight}
              semibold
            >
              {title}
            </Text>
            <Text color={Colors.textLight} small>
              {name}, {moment(updated_at).fromNow()}
            </Text>
          </View>
        </View>
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flexDirection: 'row',
    padding: Layout.margin
  },
  image: {
    borderRadius: Layout.border.radius,
    height: Layout.avatar.height,
    width: Layout.avatar.width
  },
  details: {
    flex: 1,
    marginLeft: Layout.margin
  },
  subject: {
    marginBottom: Layout.padding
  },
  actions: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  action: {
    justifyContent: 'center',
    paddingHorizontal: Layout.margin
  }
})
