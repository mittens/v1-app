import { groupBy } from 'lodash'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { AppState, AppStateStatus, RefreshControl } from 'react-native'
import { useDynamicValue } from 'react-native-dark-mode'
import { SwipeListView } from 'react-native-swipe-list-view'
import { SafeAreaView } from 'react-navigation'

import { Header, Spinner, Swipe } from '../components'
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

  if (loading && notifications.length === 0) {
    return <Spinner />
  }

  const sections = Object.entries(groupBy(notifications, 'unread')).map(
    ([key, data]) => ({
      data,
      title: key === 'true' ? 'unread' : 'notifications'
    })
  )

  return (
    <SafeAreaView
      forceInset={{
        bottom: 'never',
        top: 'always'
      }}>
      <SwipeListView
        keyExtractor={item => item.id}
        leftOpenValue={120}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={backgroundColor}
            onRefresh={refetch}
            refreshing={loading}
            colors={[colors.primary, colors.accent]}
            tintColor={colors.primary}
          />
        }
        renderHiddenItem={({ item: { id } }, map) => (
          <Swipe id={id} markAsRead={markAsRead} row={map[id]} />
        )}
        renderItem={({ item }) => <Notification notification={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Header markAllAsRead={markAllAsRead} title={title} />
        )}
        sections={sections}
        useSectionList
      />
    </SafeAreaView>
  )
}
