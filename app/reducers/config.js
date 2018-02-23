import {
  GET_CONFIG_PENDING,
  GET_CONFIG_SUCCESS,
  GET_CONFIG_FAILURE,
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
    case LOGIN:
    case LOGOUT:
      return initialState

    case GET_CONFIG_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_CONFIG_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_CONFIG_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
