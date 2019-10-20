import moment from 'moment'
import React, { FunctionComponent, useRef } from 'react'
import { Image, Text, View } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { img_mark_as_read, img_open_in_browser } from '../assets'
import { colors, fonts, layout } from '../styles'
import { GitHubNotification } from '../types'
import { Touchable } from './touchable'

interface Props {
  notification: GitHubNotification

  markAsRead: (id: string, open?: boolean) => void
}

export const Notification: FunctionComponent<Props> = ({
  notification: {
    id,
    repository: {
      name,
      owner: { avatar_url }
    },
    subject: { title },
    unread,
    updated_at
  },
  markAsRead
}) => {
  const styles = useDynamicStyleSheet(stylesheet)

  const swipeable = useRef<Swipeable>(null)

  return (
    <Swipeable
      ref={swipeable}
      renderLeftActions={() => (
        <View style={styles.actions}>
          <Touchable
            style={styles.action}
            onPress={() => {
              markAsRead(id)

              if (swipeable.current) {
                swipeable.current.close()
              }
            }}>
            <Image style={styles.icon} source={img_mark_as_read} />
          </Touchable>
          <Touchable
            style={styles.action}
            onPress={() => {
              markAsRead(id, true)

              if (swipeable.current) {
                swipeable.current.close()
              }
            }}>
            <Image style={styles.icon} source={img_open_in_browser} />
          </Touchable>
        </View>
      )}>
      <View style={styles.main}>
        <Image
          style={styles.image}
          source={{
            uri: avatar_url
          }}
        />
        <View style={styles.details}>
          <Text style={[styles.subject, unread && styles.unread]}>{title}</Text>
          <Text style={[styles.footer, unread && styles.unread]}>
            {name}, {moment(updated_at).fromNow()}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

const stylesheet = new DynamicStyleSheet({
  action: {
    justifyContent: 'center'
  },
  actions: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  footer: {
    ...fonts.small,
    color: colors.foregroundLight
  },
  icon: {
    ...layout.icon,
    margin: layout.margin
  },
  image: {
    ...layout.avatar,
    backgroundColor: colors.backgroundDark,
    borderRadius: layout.border.radius
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    padding: layout.margin
  },
  subject: {
    ...fonts.regular,
    color: colors.foregroundLight,
    marginBottom: layout.padding
  },
  unread: {
    color: colors.foreground
  }
})
