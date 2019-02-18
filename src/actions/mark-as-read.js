import update from 'immutability-helper'

import { dialog, github, firebase } from '../lib'

import { getNotificationsSuccess } from './get-notifications'

export default notification => async (dispatch, getState) => {
  try {
    const {
      notifications: { notifications }
    } = getState()

    const { id } = notification

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
