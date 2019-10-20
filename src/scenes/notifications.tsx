import { groupBy, orderBy } from 'lodash'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { AppState, AppStateStatus, SectionList } from 'react-native'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { SafeAreaView } from 'react-navigation'

import { Header, Refresh, Spinner } from '../components'
import { Notification } from '../components/notification'
import { useNotifications } from '../hooks'
import { colors } from '../styles'

export const Notifications: FunctionComponent = () => {
  const styles = useDynamicStyleSheet(stylesheet)

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

  const sections = orderBy(
    Object.entries(groupBy(notifications, 'unread')).map(([key, data]) => ({
      data,
      title: key === 'false' ? 'notifications' : 'unread'
    })),
    'title',
    'desc'
  )

  return (
    <SafeAreaView
      style={styles.main}
      forceInset={{
        bottom: 'never'
      }}>
      <SectionList
        keyExtractor={item => item.id}
        refreshControl={<Refresh onRefresh={refetch} refreshing={loading} />}
        renderItem={({ item }) => (
          <Notification
            markAsRead={(id, open) => markAsRead(id, open)}
            notification={item}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Header
            markAllAsRead={() => markAllAsRead()}
            title={title}
            unread={sections.length === 2}
          />
        )}
        sections={sections}
      />
    </SafeAreaView>
  )
}

const stylesheet = new DynamicStyleSheet({
  main: {
    backgroundColor: colors.background,
    flex: 1
  }
})
