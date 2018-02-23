import {
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN,
  LOGOUT
} from '../constants'

const initialState = {
  data: null,
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case LOGOUT:
      return initialState

    case LOGIN:
      const { user } = data

      return {
        ...initialState,
        data: user
      }

    case GET_USER_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_USER_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_USER_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
