import { GET_ALL_PENDING, GET_ALL_SUCCESS, GET_ALL_FAILURE } from '../constants'

import { api } from '../lib'

export const getAllPending = () => {
  return {
    type: GET_ALL_PENDING
  }
}

export const getAllSuccess = data => {
  return {
    type: GET_ALL_SUCCESS,
    data
  }
}

export const getAllFailure = error => {
  return {
    type: GET_ALL_FAILURE,
    error
  }
}

export default () => {
  return async dispatch => {
    dispatch(getAllPending())

    try {
      const notifications = await api.get('/notifications?all=true')

      dispatch(getAllSuccess(notifications))
    } catch (err) {
      dispatch(getAllFailure(err))
    }
  }
}
