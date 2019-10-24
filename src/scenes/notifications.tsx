import { get, orderBy } from 'lodash'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import {
  AppState,
  AppStateStatus,
  FlatList,
  RefreshControl
} from 'react-native'
import { useDynamicValue } from 'react-native-dark-mode'

import { Header } from '../components'
import { Notification } from '../components/notification'
import { useNotifications } from '../hooks'
import { colors } from '../styles'

export const Notifications: FunctionComponent = () => {
  const backgroundColor = useDynamicValue(colors.backgroundDark)

  const {
    notifications,
    loading,
    fetch,
    markAsRead,
    markAllAsRead
  } = useNotifications()

  const refetch = useCallback(fetch, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    const appStateListener = (state: AppStateStatus) => {
      if (state === 'active') {
        refetch()
      }
    }

    AppState.addEventListener('change', appStateListener)

    return () => {
      AppState.removeEventListener('change', appStateListener)
    }
  }, [refetch])

  const data = orderBy(
    notifications,
    ['unread', 'updated_at'],
    ['desc', 'desc']
  )

  const unread = get(data, '0.unread', false)

  return (
    <>
      <Header markAllAsRead={() => markAllAsRead()} unread={unread} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={backgroundColor}
            onRefresh={refetch}
            refreshing={loading}
            colors={[colors.primary, colors.accent]}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => (
          <Notification
            markAsRead={(id, open) => markAsRead(id, open)}
            notification={item}
          />
        )}
      />
    </>
  )
}
