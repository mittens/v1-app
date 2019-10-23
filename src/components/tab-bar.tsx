import React, { FunctionComponent } from 'react'
import { Image } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { SafeAreaView } from 'react-navigation'
import { BottomTabBarProps } from 'react-navigation-tabs/lib/typescript/src/types'

import { img_exit, img_help, img_notifications } from '../assets'
import { useAuth } from '../hooks'
import { dialog } from '../lib'
import { colors, layout } from '../styles'
import { Touchable } from './touchable'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  jumpTo,
  navigation: {
    state: { index }
  }
}) => {
  const styles = useDynamicStyleSheet(stylesheet)

  const { logout } = useAuth()

  const tabs = [
    {
      icon: img_notifications,
      key: 1,
      onPress: () => jumpTo('Notifications')
    },
    {
      icon: img_help,
      key: 0,
      onPress: () => jumpTo('Help')
    },
    {
      icon: img_exit,
      key: 2,
      onPress: async () => {
        const yes = await dialog.confirm(
          'logout',
          'are you sure you want to log out?'
        )

        if (yes) {
          logout()
        }
      }
    }
  ]

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'always',
        top: 'never'
      }}>
      {tabs.map(({ icon, key, onPress }) => (
        <Touchable key={key} style={styles.link} onPress={onPress}>
          <Image
            style={[styles.icon, key === index && styles.active]}
            source={icon}
          />
        </Touchable>
      ))}
    </SafeAreaView>
  )
}

const stylesheet = new DynamicStyleSheet({
  active: {
    opacity: 1
  },
  icon: {
    ...layout.icon,
    opacity: 0.5
  },
  link: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: layout.margin
  },
  main: {
    borderTopColor: colors.backgroundDark,
    borderTopWidth: layout.border.width,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
