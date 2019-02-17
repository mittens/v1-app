import {
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../actions/get-user'

const initial = {
  user: null,
  error: null,
  loading: false
}

export default (state = initial, { type, user, error }) => {
  switch (type) {
    case GET_USER_PENDING:
      return {
        ...state,
        error: null,
        loading: true
      }

    case GET_USER_SUCCESS:
      return {
        ...state,
        user,
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
