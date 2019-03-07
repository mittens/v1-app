import { Linking } from 'react-native'
import update from 'immutability-helper'

import { dialog, github, firebase } from '../lib'

import { getNotificationsSuccess } from './get-notifications'

export default (notification, open) => async (dispatch, getState) => {
  try {
    const {
      notifications: { notifications }
    } = getState()

    const {
      id,
      unread,
      subject: { url }
    } = notification

    if (open) {
      const uri = url
        .replace('api.github.com/repos', 'github.com')
        .replace('/pulls/', '/pull/')

      Linking.openURL(uri)
    }

    if (!unread) {
      return
    }

    await github.markAsRead(id)

    const index = notifications.findIndex(
      notification => notification.id === id
    )

    const data = update(notifications, {
      [index]: {
        unread: {
          $set: false
        }
      }
    })

    dispatch(getNotificationsSuccess(data))

    await firebase.badge(-1)
  } catch (error) {
    const { message } = error

    dialog.alert(message)
  }
}
