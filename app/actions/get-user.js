import {
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../constants'

import { api } from '../lib'

export const getUserPending = () => {
  return {
    type: GET_USER_PENDING
  }
}

export const getUserSuccess = data => {
  return {
    type: GET_USER_SUCCESS,
    data
  }
}

export const getUserFailure = error => {
  return {
    type: GET_USER_FAILURE,
    error
  }
}

export default () => {
  return async dispatch => {
    dispatch(getUserPending())

    try {
      const user = await api.get('/user')

      dispatch(getUserSuccess(user))
    } catch (err) {
      dispatch(getUserFailure(err))
    }
  }
}