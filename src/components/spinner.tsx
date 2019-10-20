import React, { FunctionComponent } from 'react'
import { ActivityIndicator } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { SafeAreaView } from 'react-navigation'

import { colors } from '../styles'

export const Spinner: FunctionComponent = () => {
  const styles = useDynamicStyleSheet(stylesheet)

  return (
    <SafeAreaView style={styles.main}>
      <ActivityIndicator color={colors.primary} size="large" />
    </SafeAreaView>
  )
}

const stylesheet = new DynamicStyleSheet({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})
