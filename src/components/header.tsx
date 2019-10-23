import React, { FunctionComponent } from 'react'
import { Image, Text, View } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { SafeAreaView } from 'react-navigation'

import { img_mark_all_as_read } from '../assets'
import { colors, fonts, layout } from '../styles'
import { Touchable } from './touchable'

interface Props {
  unread: boolean

  markAllAsRead: () => void
}

export const Header: FunctionComponent<Props> = ({ unread, markAllAsRead }) => {
  const styles = useDynamicStyleSheet(stylesheet)

  return (
    <SafeAreaView
      forceInset={{
        bottom: 'never',
        top: 'always'
      }}>
      <View style={styles.main}>
        <Text style={styles.title}>notifications</Text>
        {unread && (
          <Touchable onPress={markAllAsRead}>
            <Image style={styles.icon} source={img_mark_all_as_read} />
          </Touchable>
        )}
      </View>
    </SafeAreaView>
  )
}

const stylesheet = new DynamicStyleSheet({
  icon: {
    ...layout.icon
  },
  main: {
    alignItems: 'center',
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
