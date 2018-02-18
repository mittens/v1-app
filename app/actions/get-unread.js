import {
  GET_UNREAD_PENDING,
  GET_UNREAD_SUCCESS,
  GET_UNREAD_FAILURE
} from '../constants'

import { api } from '../lib'

export const getUnreadPending = () => {
  return {
    type: GET_UNREAD_PENDING
  }
}

export const getUnreadSuccess = data => {
  return {
    type: GET_UNREAD_SUCCESS,
    data
  }
}

export const getUnreadFailure = error => {
  return {
    type: GET_UNREAD_FAILURE,
    error
  }
}

export default () => {
  return async dispatch => {
    dispatch(getUnreadPending())

    try {
      const notifications = await api.get('/notifications')

      dispatch(getUnreadSuccess(notifications))
    } catch (err) {
      dispatch(getUnreadFailure(err))
    }
  }
}
