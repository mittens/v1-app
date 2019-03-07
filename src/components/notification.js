import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import moment from 'moment'

import { Colors, Layout } from '../styles'

import Text from './text'

export default class Notification extends Component {
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
  help: {
    position: 'absolute',
    marginLeft: Layout.margin
  }
})
