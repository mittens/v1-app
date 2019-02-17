import { dialog, github } from '../lib'

export const GET_NOTIFICATIONS_PENDING = 'GET_NOTIFICATIONS_PENDING'
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS'
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE'

export const getNotificationsPending = () => {
  return {
    type: GET_NOTIFICATIONS_PENDING
  }
}

export const getNotificationsSuccess = notifications => {
  return {
    notifications,
    type: GET_NOTIFICATIONS_SUCCESS
  }
}

export const getNotificationsFailure = error => {
  return {
    error,
    type: GET_NOTIFICATIONS_FAILURE
  }
}

export default () => async dispatch => {
  dispatch(getNotificationsPending())

  try {
    const notifications = await github.getNotifications()

    dispatch(getNotificationsSuccess(notifications))
  } catch (error) {
    dispatch(getNotificationsFailure(error))

    const { message } = error

    dialog.alert(message)
  }
}
