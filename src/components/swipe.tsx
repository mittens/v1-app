import React, { FunctionComponent } from 'react'
import { Image, View } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { SwipeRow } from 'react-native-swipe-list-view'

import { img_mark_as_read, img_open_in_browser } from '../assets'
import { colors, layout } from '../styles'
import { GitHubNotification } from '../types'
import { Touchable } from './touchable'

interface Props {
  id: string
  row: SwipeRow<GitHubNotification>

  markAsRead: (id: string, open?: boolean) => void
}

export const Swipe: FunctionComponent<Props> = ({ id, row, markAsRead }) => {
  const styles = useDynamicStyleSheet(stylesheet)

  return (
    <View style={styles.main}>
      <Touchable
        style={styles.action}
        onPress={() => {
          markAsRead(id)

          row.closeRow()
        }}>
        <Image style={styles.icon} source={img_mark_as_read} />
      </Touchable>
      <Touchable
        style={styles.action}
        onPress={() => {
          markAsRead(id, true)

          row.closeRow()
        }}>
        <Image style={styles.icon} source={img_open_in_browser} />
      </Touchable>
    </View>
  )
}

const stylesheet = new DynamicStyleSheet({
  action: {
    justifyContent: 'center'
  },
  icon: {
    ...layout.icon,
    margin: layout.margin
  },
  main: {
    alignItems: 'stretch',
    backgroundColor: colors.backgroundDark,
    flex: 1,
    flexDirection: 'row'
  }
})
