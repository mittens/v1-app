import React, { FunctionComponent } from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

import { colors } from '../styles'

export const Refresh: FunctionComponent<RefreshControlProps> = ({
  refreshing,
  onRefresh
}) => {
  return (
    <RefreshControl
      colors={[colors.primary, colors.accent]}
      onRefresh={onRefresh}
      refreshing={refreshing}
      tintColor={colors.primary}
    />
  )
}
