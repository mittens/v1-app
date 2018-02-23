import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

import { Touchable } from '.'
import { Colors, Layout } from '../styles'

export default class Notification extends Component {
  render() {
    const { notification, onPress } = this.props
    const {
      repository,
      subject,
      unread,
      last_read_at,
      updated_at
    } = notification
    const { full_name, owner } = repository
    const { avatar_url } = owner
    const { title } = subject

    const read = last_read_at && moment(last_read_at).fromNow()
    const updated = updated_at && moment(updated_at).fromNow()

    return (
      <View style={unread && styles.unread}>
        <Touchable style={styles.main} onPress={() => onPress(notification)}>
          <Image style={styles.image} source={{ uri: avatar_url }} />
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.repository}>{full_name}</Text>
            {(read || updated) && (
              <View style={styles.footer}>
                {read && (
                  <Text style={[styles.time, styles.read]}>Read {read}</Text>
                )}
                {updated && <Text style={styles.time}>Updated {updated}</Text>}
              </View>
            )}
          </View>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  unread: {
    backgroundColor: Colors.backgroundDark
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  image: {
    borderRadius: 20,
    height: 40,
    resizeMode: 'contain',
    width: 40
  },
  details: {
    flex: 1,
    marginLeft: Layout.margin
  },
  title: {
    color: Colors.text
  },
  repository: {
    color: Colors.textLight,
    fontSize: 12,
    marginVertical: Layout.padding
  },
  footer: {
    flexDirection: 'row'
  },
  time: {
    color: Colors.textLight,
    fontSize: 12
  },
  read: {
    marginRight: Layout.padding
  }
})
