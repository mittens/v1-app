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
      const auth = await storage.get('authToken')
      const github = await storage.get('githubToken')

      if (auth && github) {
        dispatch(
          getTokenSuccess({
            auth,
            github
          })
        )
      } else {
        const err = new Error('Token not found')

        dispatch(getTokenFailure(err))
      }
    } catch (err) {
      dispatch(getTokenFailure(err))
    }
  }
}
