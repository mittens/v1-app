import {
  GET_PROFILE_PENDING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from '../constants'

import { github } from '../lib'

export const getProfilePending = () => {
  return {
    type: GET_PROFILE_PENDING
  }
}

export const getProfileSuccess = data => {
  return {
    type: GET_PROFILE_SUCCESS,
    data
  }
}

export const getProfileFailure = error => {
  return {
    type: GET_PROFILE_FAILURE,
    error
  }
}

export default () => {
  return async dispatch => {
    dispatch(getProfilePending())

    try {
      const user = await github.get('/user')

      dispatch(getProfileSuccess(user))
    } catch (err) {
      dispatch(getProfileFailure(err))
    }
  }
}
