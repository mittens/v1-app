import { GET_ALL_PENDING, GET_ALL_SUCCESS, GET_ALL_FAILURE } from '../constants'

const initialState = {
  data: [],
  error: null,
  loading: false
}

export default (state = initialState, { type, data, error }) => {
  switch (type) {
    case GET_ALL_PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_SUCCESS:
      return {
        ...state,
        data,
        loading: false
      }

    case GET_ALL_FAILURE:
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}
