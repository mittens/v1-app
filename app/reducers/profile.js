import {
  GET_PROFILE_PENDING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
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

    case GET_PROFILE_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_PROFILE_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
