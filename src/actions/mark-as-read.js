import update from 'immutability-helper'

import { dialog, github } from '../lib'

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
  } catch (error) {
    const { message } = error

    dialog.alert(message)
  }
}
