import React, { FunctionComponent } from 'react'
import { Image, Text } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { SafeAreaView } from 'react-navigation'

import { img_mittens } from '../assets'
import { Button } from '../components'
import { useAuth } from '../hooks'
import { colors, fonts, layout } from '../styles'

export const Login: FunctionComponent = () => {
  const styles = useDynamicStyleSheet(stylesheet)

  const { loading, login } = useAuth()

  return (
    <SafeAreaView style={styles.main}>
      <Image style={styles.mittens} source={img_mittens} />
      <Text style={styles.title}>mittens</Text>
      <Text style={styles.description}>
        brings you push notifications {'\n'} from GitHub
      </Text>
      <Button
        style={styles.login}
        label="Login"
        loading={loading}
        onPress={login}
      />
    </SafeAreaView>
  )
}

const stylesheet = new DynamicStyleSheet({
  description: {
    ...fonts.small,
    color: colors.foreground,
    marginTop: layout.padding,
    textAlign: 'center'
  },
  login: {
    backgroundColor: colors.accent,
    marginTop: layout.margin * 2
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  mittens: {
    ...layout.mittens
  },
  title: {
    ...fonts.title,
    color: colors.accent,
    marginTop: layout.margin
  }
})
