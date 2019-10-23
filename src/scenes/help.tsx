import React, { FunctionComponent } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { SafeAreaView } from 'react-navigation'

import { img_love, img_mittens } from '../assets'
import { Touchable } from '../components'
import { useMeta } from '../hooks'
import { browser } from '../lib'
import { colors, fonts, layout } from '../styles'

export const Help: FunctionComponent = () => {
  const styles = useDynamicStyleSheet(stylesheet)

  const { issues, tips } = useMeta()

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'never',
        top: 'always'
      }}>
      <ScrollView contentContainerStyle={styles.content}>
        <Touchable onPress={() => browser.open('https://mittens.app')}>
          <Image style={styles.mittens} source={img_mittens} />
        </Touchable>
        <Text style={styles.title}>mittens</Text>
        <Text style={styles.description}>
          brings you push notifications {'\n'} from GitHub
        </Text>
        <View style={styles.help}>
          <Text style={styles.subtitle}>tips</Text>
          {tips.map((tip, index) => (
            <Text key={index} style={styles.tip}>
              {tip}
            </Text>
          ))}
          <Text style={styles.subtitle}>known issues</Text>
          {issues.map((issue, index) => (
            <Text key={index} style={styles.tip}>
              {issue}
            </Text>
          ))}
        </View>
        <Touchable
          style={styles.credits}
          onPress={() => browser.open('https://alizahid.dev')}>
          <Text style={styles.credit}>built with</Text>
          <Image style={styles.love} source={img_love} />
          <Text style={styles.credit}>by ali zahid</Text>
        </Touchable>
      </ScrollView>
    </SafeAreaView>
  )
}

const stylesheet = new DynamicStyleSheet({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  credit: {
    ...fonts.small,
    color: colors.foregroundLight
  },
  credits: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  description: {
    ...fonts.small,
    color: colors.foreground,
    marginTop: layout.padding,
    textAlign: 'center'
  },
  help: {
    marginBottom: layout.margin * 2,
    marginTop: layout.margin
  },
  love: {
    ...layout.icon,
    marginHorizontal: layout.padding / 2
  },
  main: {
    flex: 1
  },
  mittens: {
    ...layout.mittens
  },
  subtitle: {
    ...fonts.subtitle,
    color: colors.foreground,
    marginTop: layout.margin,
    textAlign: 'center'
  },
  tip: {
    ...fonts.small,
    color: colors.foreground,
    marginTop: layout.padding,
    textAlign: 'center'
  },
  title: {
    ...fonts.title,
    color: colors.accent,
    marginTop: layout.margin
  }
})
