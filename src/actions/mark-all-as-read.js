import update from 'immutability-helper'

import { dialog, github, firebase } from '../lib'

import { getNotificationsSuccess } from './get-notifications'

export default () => async (dispatch, getState) => {
  try {
    const {
      notifications: { notifications }
    } = getState()

    await github.markAllAsRead()

    const query = notifications.reduce((query, notification, index) => {
      query[index] = {
        unread: {
          $set: false
        }
      }

      return query
    }, {})

    const data = update(notifications, query)

    dispatch(getNotificationsSuccess(data))

    await firebase.clear()
  } catch (error) {
    const { message } = error

    dialog.alert(message)
  }
}
