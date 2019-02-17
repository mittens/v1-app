import {
  GET_NOTIFICATIONS_PENDING,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE
} from '../actions/get-notifications'

const initial = {
  notifications: [],
  error: null,
  loading: false
}

export default (state = initial, { type, notifications, error }) => {
  switch (type) {
    case GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        error: null,
        loading: true
      }

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications,
        loading: false
      }

    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
