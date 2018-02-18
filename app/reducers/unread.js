import {
  GET_UNREAD_PENDING,
  GET_UNREAD_SUCCESS,
  GET_UNREAD_FAILURE
} from '../constants'

const initialState = {
  data: [],
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_UNREAD_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_UNREAD_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_UNREAD_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
