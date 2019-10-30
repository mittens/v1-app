import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'

import { colors, fonts, layout } from '../styles'
import { GitHubNotification } from '../types'

interface Props {
  notification: GitHubNotification
}

export const Notification: FunctionComponent<Props> = ({
  notification: {
    repository: {
      name,
      owner: { avatar_url }
    },
    subject: { title },
    unread,
    updated_at
  }
}) => {
  const styles = useDynamicStyleSheet(stylesheet)

  return (
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
  )
}

const stylesheet = new DynamicStyleSheet({
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  footer: {
    ...fonts.small,
    color: colors.foregroundLight
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
