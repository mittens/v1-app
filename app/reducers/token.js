import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE
} from '../constants'

const initialState = {
  data: null,
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_TOKEN_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_TOKEN_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
