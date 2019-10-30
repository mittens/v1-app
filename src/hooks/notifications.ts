import * as Sentry from '@sentry/react-native'
import axios, { AxiosRequestConfig } from 'axios'
import { cloneDeep, get, orderBy, set } from 'lodash'
import moment from 'moment'
import { useState } from 'react'
import { GITHUB_API_URI } from 'react-native-dotenv'

import { browser, dialog, firebase, storage } from '../lib'
import { GitHubNotification } from '../types'

const fixtures = [
  {
    id: '1',
    repository: {
      name: 'slinky',
      owner: {
        avatar_url: 'https://avatars3.githubusercontent.com/u/941775?s=460&v=4'
      }
    },
    subject: {
      title: "Links that don't have # as href",
      url: 'https://github.com/alizahid/slinky/issues/39'
    },
    unread: true,
    updated_at: moment().subtract(1, 'hours')
  },
  {
    id: '2',
    repository: {
      name: 'react-native',
      owner: {
        avatar_url: 'https://avatars2.githubusercontent.com/u/69631?s=200&v=4'
      }
    },
    subject: {
      title: 'Multiple Bugs when upgrading to 61.2',
      url: 'https://github.com/facebook/react-native/issues/26860'
    },
    unread: false,
    updated_at: moment().subtract(2, 'hours')
  },
  {
    id: '3',
    repository: {
      name: 'ember.js',
      owner: {
        avatar_url: 'https://avatars0.githubusercontent.com/u/1253363?s=200&v=4'
      }
    },
    subject: {
      title: '[3.13] Query Params not updating when refreshing route'
    },
    unread: false,
    updated_at: moment().subtract(3, 'hours')
  },
  {
    id: '4',
    repository: {
      name: 'app',
      owner: {
        avatar_url:
          'https://avatars2.githubusercontent.com/u/49198482?s=200&v=4'
      }
    },
    subject: {
      title: 'Add Dark Mode'
    },
    unread: true,
    updated_at: moment().subtract(4, 'hours')
  }
]

export const useNotifications = () => {
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState<GitHubNotification[]>([])

  const fetch = async () => {
    setLoading(true)

    try {
      const data = await request<GitHubNotification[]>(
        `/notifications?all=true&random=${Date.now()}`,
        'get'
      )

      setNotifications(
        orderBy(data, ['unread', 'updated_at'], ['desc', 'desc'])
      )
    } catch (error) {
      const { message } = error

      if (message.includes('401')) {
        await storage.remove('@login')
        await storage.remove('@token')

        await firebase.logout()

        return
      }

      dialog.alert('error', message)

      Sentry.captureException(error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string, open?: boolean) => {
    const copy = cloneDeep(notifications)

    const index = copy.findIndex(notification => notification.id === id)

    set(copy, `${index}.unread`, false)

    setNotifications(copy)

    if (open) {
      const notification = get(notifications, index)

      const uri = notification.subject.url
        .replace('api.github.com/repos', 'github.com')
        .replace('/pulls/', '/pull/')

      browser.open(uri)
    }

    try {
      await request(`/notifications/threads/${id}`, 'patch')
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  const markAllAsRead = async () => {
    const copy = cloneDeep(notifications).map(notification => ({
      ...notification,
      unread: false
    }))

    setNotifications(copy)

    try {
      await request('/notifications', 'put')
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return {
    fetch,
    fixtures,
    loading,
    markAllAsRead,
    markAsRead,
    notifications
  }
}

export const request = async <ResponseType>(
  uri: string,
  method: AxiosRequestConfig['method']
): Promise<ResponseType> => {
  const token = await storage.get('@token')

  const { data } = await axios.request<ResponseType>({
    headers: {
      authorization: `token ${token}`
    },
    method,
    url: GITHUB_API_URI + uri
  })

  return data
}
