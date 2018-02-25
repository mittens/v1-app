import {
  GET_NOTIFICATIONS_PENDING,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  LOGOUT
} from '../constants'

const initialState = {
  data: [],
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case LOGOUT:
      return initialState

    case GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        data,
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
