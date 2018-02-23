import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE
} from '../constants'

import { storage } from '../lib'

export const getTokenPending = () => {
  return {
    type: GET_TOKEN_PENDING
  }
}

export const getTokenSuccess = data => {
  return {
    type: GET_TOKEN_SUCCESS,
    data
  }
}

export const getTokenFailure = error => {
  return {
    type: GET_TOKEN_FAILURE,
    error
  }
}

export default () => {
  return async dispatch => {
    dispatch(getTokenPending())

    try {
      const token = await storage.get('githubToken')

      if (token) {
        dispatch(getTokenSuccess(token))
      } else {
        dispatch(getTokenFailure())
      }
    } catch (err) {
      dispatch(getTokenFailure())
    }
  }
}
