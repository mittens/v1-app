import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'

import { img_mark_all_as_read } from '../assets'
import { colors, fonts, layout } from '../styles'
import { Touchable } from './touchable'

interface Props {
  title: string

  markAllAsRead: () => void
}

export const Header: FunctionComponent<Props> = ({ title, markAllAsRead }) => {
  const styles = useDynamicStyleSheet(stylesheet)

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>
      {title === 'unread' && (
        <Touchable onPress={markAllAsRead}>
          <Image style={styles.icon} source={img_mark_all_as_read} />
        </Touchable>
      )}
    </View>
  )
}

const stylesheet = new DynamicStyleSheet({
  icon: {
    ...layout.icon
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomColor: colors.backgroundDark,
    borderBottomWidth: layout.border.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: layout.margin
  },
  title: {
    ...fonts.title,
    color: colors.foreground
  }
})
